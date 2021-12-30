import { IInnerNavBar } from "../interfaces/navbar.interface";

export interface IComponentState {
  innerNavBar:IInnerNavBar,
  foodsIntro:{
    title: string;
  }
}

export const initialState: IComponentState = {
  innerNavBar:{
    title:'Знание',
    navItems:[]
  },
  foodsIntro: {
    title: ''
  },
};
