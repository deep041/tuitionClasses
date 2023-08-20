export interface Result {
    studentId: string,
    marks: number,
    totalMarks: number,
    subject: string,
    date: Date,
    _id: string
}

export interface GroupedResult {
    _id: id,
    result: Result[]
}

interface id {
    subject: string
}