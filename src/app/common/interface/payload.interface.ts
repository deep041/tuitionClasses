export interface AddAttendance {
    studentId: string,
    status: boolean,
    date: Date
}

export interface Login {
    email: string,
    password: string
}

export interface AddResult {
    studentId: string,
    marks: string,
    subject?: string,
    date: Date,
    totalMarks: number
}