export interface IComponentState {
  innerNavBar: { title: string; navItems: string[] } | null;
  foodsIntro: {
    title: string;
  };
}

export const initialState: IComponentState = {
  innerNavBar: null,
  foodsIntro: {
    title: 'храни и продукти',
  },
};
