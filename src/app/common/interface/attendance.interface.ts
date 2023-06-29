export interface Attendance {
    studentId: string,
    status: boolean,
    date: Date,
    _id: string
}

export interface GroupedAttendance {
    _id: number,
    attendance: Attendance[]
}