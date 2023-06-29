export interface Month {
    id: number,
    month: string
}

export interface SelectOption {
    title: string,
    value: string,
    isSelected?: boolean,
    isDisabled?: boolean
}

export interface Class {
    class: string,
    board: string,
    details: ClassDetails[],
    fees: number,
    registrationFees: number
}

export interface ClassDetails {
    title: string,
    value: Array<string> | number | string | any,
    extraText?: string,
    notes?: string[]
}