export interface IComponentState {
  innerNavBar:{title:string,navItems:any[]}
}

export const initialState: IComponentState = {
  innerNavBar:{
    title:'Знание',
    navItems:[]
  }
};
