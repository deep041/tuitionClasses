import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppData } from '../../interface/app-data.interface';
import { Fees } from '../../interface/fees.interface';
import { AddAttendance, Login } from '../../interface/payload.interface';
import { AddAttendanceResponse, AllStudentResponse, AppDataResponse, ClassWiseStudentResponse, FeesResponse, GroupedAttendanceResponse, StudentResponse } from '../../interface/response.interface';
import { Student } from '../../interface/student.interface';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    url = environment.apiUrl;

    constructor(private httpService: HttpClient) { }

    test() {
        return this.httpService.get(this.url);
    }

    appData(isAdmin: boolean): Observable<AppDataResponse> {
        return this.httpService.get<AppDataResponse>(this.url + 'frontend?isAdmin=' + isAdmin);
    }

    login(payload: Login): Observable<StudentResponse> {
        return this.httpService.post<StudentResponse>(this.url + 'user/login', payload);
    }

    register(payload: Student): Observable<StudentResponse> {
        return this.httpService.post<StudentResponse>(this.url + 'user/register', payload);
    }

    getAllStudents(): Observable<AllStudentResponse> {
        return this.httpService.get<AllStudentResponse>(this.url + 'student');
    }

    addFees(payload: Fees): Observable<FeesResponse> {
        return this.httpService.post<FeesResponse>(this.url + 'fees', payload);
    }

    getFeesDetails(studentId: string): Observable<FeesResponse> {
        return this.httpService.get<FeesResponse>(this.url + 'fees?id=' + studentId);
    }

    getUserData(id: string): Observable<StudentResponse> {
        return this.httpService.get<StudentResponse>(this.url + 'student/' + id);
    }

    getClassWiseStudents(): Observable<ClassWiseStudentResponse> {
        return this.httpService.post<ClassWiseStudentResponse>(this.url + 'student/classWiseStudents', {});
    }

    addAttendance(payload: AddAttendance[]): Observable<AddAttendanceResponse> {
        return this.httpService.post<AddAttendanceResponse>(this.url + 'attendance', payload);
    }

    getAttendance(id: number): Observable<GroupedAttendanceResponse> {
        return this.httpService.get<GroupedAttendanceResponse>(this.url + 'attendance/' + id);
    }
}
