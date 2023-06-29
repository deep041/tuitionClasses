import { AppData } from "./app-data.interface"
import { Attendance, GroupedAttendance } from "./attendance.interface"
import { Fees } from "./fees.interface"
import { Student } from "./student.interface"

export interface StudentResponse {
    message: string,
    status: number,
    data: Student
}

export interface ClassWiseStudentResponse {
    message: string,
    status: number,
    data: Student[]
}

export interface AddAttendanceResponse {
    message: string,
    status: number,
    data: Attendance[]
}

export interface GroupedAttendanceResponse {
    message: string,
    status: number,
    data: GroupedAttendance[]
}

export interface FeesResponse {
    message: string,
    status: number,
    data: Fees
}

export interface AllStudentResponse {
    message: string,
    status: number,
    data: Student[]
}

export interface AppDataResponse {
    message: string,
    status: number,
    data: AppData
}