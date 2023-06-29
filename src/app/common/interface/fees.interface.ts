export interface Fees {
    studentId: string,
    registrationFee: number,
    discount: number,
    totalFees: number,
    feesPartitions: number,
    createdAt: Date,
    updatedAt: Date,
    fees: fee[],
    _id: string
}

interface fee {
    fee: number
}