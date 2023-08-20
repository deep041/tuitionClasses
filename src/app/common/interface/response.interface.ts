import { AppData } from "./app-data.interface"
import { Attendance, GroupedAttendance } from "./attendance.interface"
import { Fees } from "./fees.interface"
import { GroupedResult, Result } from "./result.interface"
import { Student, StudentAndClassGrouped, StudentAttendance } from "./student.interface"

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

export interface ClassWiseStudentForAttendanceResponse {
    message: string,
    status: number,
    data: StudentAttendance[]
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
    data: StudentAndClassGrouped[]
}

export interface AppDataResponse {
    message: string,
    status: number,
    data: AppData
}

export interface AddResultResponse {
    message: string,
    status: number,
    data: Result[]
}

export interface GroupedResultResponse {
    message: string,
    status: number,
    data: GroupedResult[]
}