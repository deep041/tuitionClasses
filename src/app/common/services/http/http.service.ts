import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppData } from '../../interface/app-data.interface';
import { Fees } from '../../interface/fees.interface';
import { AddAttendance, AddResult, Login } from '../../interface/payload.interface';
import { AddAttendanceResponse, AddResultResponse, AllStudentResponse, AppDataResponse, ClassWiseStudentForAttendanceResponse, ClassWiseStudentResponse, FeesResponse, GroupedAttendanceResponse, GroupedResultResponse, StudentResponse } from '../../interface/response.interface';
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

    addFees(payload: any): Observable<FeesResponse> {
        return this.httpService.post<FeesResponse>(this.url + 'fees', payload);
    }

    getFeesDetails(studentId: string): Observable<FeesResponse> {
        return this.httpService.get<FeesResponse>(this.url + 'fees?id=' + studentId);
    }

    getUserData(id: string): Observable<StudentResponse> {
        return this.httpService.get<StudentResponse>(this.url + 'student/' + id);
    }

    getClassWiseStudents(className: string, batch?: string): Observable<ClassWiseStudentResponse> {
        return this.httpService.get<ClassWiseStudentResponse>(this.url + 'student/classWiseStudents/' + className + '?batch=' + batch);
    }

    addAttendance(payload: AddAttendance[]): Observable<AddAttendanceResponse> {
        return this.httpService.post<AddAttendanceResponse>(this.url + 'attendance', payload);
    }

    getAttendance(id: number): Observable<GroupedAttendanceResponse> {
        return this.httpService.get<GroupedAttendanceResponse>(this.url + 'attendance/' + id);
    }

    addResult(payload: AddResult[]): Observable<AddResultResponse> {
        return this.httpService.post<AddResultResponse>(this.url + 'result', payload);
    }

    getResult(id: number): Observable<GroupedResultResponse> {
        return this.httpService.get<GroupedResultResponse>(this.url + 'result/' + id);
    }

    getClasses(): Observable<any> {
        return this.httpService.get<any>(this.url + 'classes/6475ae67ac5c47df3c94aeab');
    }

    getClassWiseStudentsForAttendance(className: string, batch: string, date: any): Observable<ClassWiseStudentForAttendanceResponse> {
        return this.httpService.get<ClassWiseStudentForAttendanceResponse>(this.url + 'student/classWiseStudentsForAttendance/' + className + '?batch=' + batch + '&date=' + date);
    }

    updateAttendance(payload: AddAttendance[]): Observable<any> {
        return this.httpService.patch<any>(this.url + 'attendance', payload);
    }

    getStudentFullDetails(id: string): Observable<any> {
        return this.httpService.get<any>(this.url + 'student/studentFullDetails/' + id);
    }

    addKit(payload: any[]): Observable<any> {
        return this.httpService.post<any>(this.url + 'kit', payload);
    }

    updateKit(payload: any[]): Observable<any> {
        return this.httpService.patch<any>(this.url + 'kit', payload);
    }

    getClassWiseStudentsForKit(className: string, batch: string, kitType: any): Observable<any> {
        return this.httpService.get<any>(this.url + 'student/classWiseStudentsForKit/' + className + '?batch=' + batch + '&kitType=' + kitType);
    }

    getKit(id: string): Observable<any> {
        return this.httpService.get<any>(this.url + 'kit/' + id);
    }

    addMaterial(payload: any[]): Observable<any> {
        return this.httpService.post<any>(this.url + 'material', payload);
    }

    updateMaterial(payload: any[]): Observable<any> {
        return this.httpService.patch<any>(this.url + 'material', payload);
    }

    getClassWiseStudentsForMaterial(className: string, batch: string, subject: any): Observable<any> {
        return this.httpService.get<any>(this.url + 'student/classWiseStudentsForMaterial/' + className + '?batch=' + batch + '&subject=' + subject);
    }

    getMaterial(id: string): Observable<any> {
        return this.httpService.get<any>(this.url + 'material/' + id);
    }

    razorPayPayment(payload: any): Observable<any> {
        return this.httpService.post<any>(this.url + 'fees/razorpay', payload);
    }
}
