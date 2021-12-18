import { IInnerNavBar } from "../interfaces/navbar.interface";

export interface IComponentState {
  innerNavBar:IInnerNavBar
}

export const initialState: IComponentState = {
  innerNavBar:{
    title:'Знание',
    navItems:[]
  }
};
