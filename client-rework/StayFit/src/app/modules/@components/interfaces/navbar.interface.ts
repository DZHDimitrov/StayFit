export interface IInnerNavBar {
    title:string;
    navItems: INavItem[];
}

interface INavItem {
    name:string;
    searchName:string;
}