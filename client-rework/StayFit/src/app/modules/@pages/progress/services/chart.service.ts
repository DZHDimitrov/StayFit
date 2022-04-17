import { Injectable } from '@angular/core';

import { BodyPart } from '../enums/BodyPart.enum';

import { Measurement } from '../models/measurement.model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() { }

  bodyParts = Object.assign({},BodyPart);

  getTranslatedBodypart(bodyPart:string) {
    const requiredBodyPart = bodyPart?.substring(0,1).toUpperCase() + bodyPart?.substring(1,bodyPart.length);

    return this.bodyParts[requiredBodyPart];
  }

  filterMeasurements(measurements:Measurement[],bodyPart:string) {
    const measurementSeries:any[][] = [];
    const prop = bodyPart.toLowerCase().toString();
    switch (prop) {
      case 'arms':
        const leftArms = this.extractMeasurement('leftArm',measurements);
        const rightArms = this.extractMeasurement('rightArm',measurements);
      
        measurementSeries.push(leftArms,rightArms);
        break;
        case 'forearms':
        const leftForearms = this.extractMeasurement('leftForearm',measurements);
        const rightForearms = this.extractMeasurement('rightForearm',measurements);
          
        measurementSeries.push(leftForearms,rightForearms);
        break;
        case 'thighs':
        const leftThighs = this.extractMeasurement('leftThigh',measurements);
        const rightThighs = this.extractMeasurement('rightThigh',measurements);
          
        measurementSeries.push(leftThighs,rightThighs);
        break;
        case 'calves':
        const leftCalves = this.extractMeasurement('leftCalf',measurements);
        const rightCalves = this.extractMeasurement('rightCalf',measurements);
          
        measurementSeries.push(leftCalves,rightCalves);
        break;
      default:
        const otherMeasurements = this.extractMeasurement(prop,measurements);
        measurementSeries.push(otherMeasurements);
        break;
    }

    return measurementSeries.filter(arr => arr.length > 0);
  }

  private extractMeasurement(bodyPart:string,measurements:any[]) {
    return measurements
    .map(m => {
      if(m[bodyPart] && m[bodyPart] !== null){
        return {
          name:bodyPart,
          value:m[bodyPart],
          dateOfMeasurement:m.dateOfMeasurement,
        }
      }
      return null;
    })
    .filter(m => m!== null);
  }

  getChartOptions(data:any):Highcharts.Options {
    return {
      title: {
        text: '',
      },
      
      subtitle: {
        text: '',
      },
      
      yAxis: {
        title: {
          text: '',
        },
      },
      xAxis: {
        visible: false,
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
        },
      },
      colors:['#8bbc21', '#f28f43'],
  
      series: [
        ...data.measurements.map(m=> {
          return {
            name: this.getTranslatedBodypart(m[0].name.toLowerCase()),
            type: 'line',
            data: m.map((v) => {
              return {
                y: v.value,
                desc: v.dateOfMeasurement,
              };
            }),
            showInLegend: false,
          }
        })
      ],
      tooltip: {
        formatter: function () {
          //@ts-ignore
          var s ='<b>' + this.point.desc + ' ' + '/' + ' ' + `${this.series?.name}: ` + this.point.y + '</b>';
          return s;
        },

        style:{
            fontSize:'13px',
            height:50,
            color:'white'
        },
        backgroundColor:'midnightblue'
      },
      credits: {
        enabled: false,
      },
      chart: {},
  
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    };
  }
}
