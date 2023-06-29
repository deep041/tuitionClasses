export interface AppData {
    name: string,
    logo: string,
    color: string,
    modules: Modules[]
}

export interface Modules {
    icon: string,
    isAdmin: boolean,
    isSelected: boolean,
    name: string,
    navigation: string
}