import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectOption } from 'src/app/common/interface/common.interface';
import { AddAttendanceResponse, ClassWiseStudentForAttendanceResponse, ClassWiseStudentResponse } from 'src/app/common/interface/response.interface';
import { Student, StudentAttendance } from 'src/app/common/interface/student.interface';
import { CommonService } from 'src/app/common/services/common/common.service';
import { HttpService } from 'src/app/common/services/http/http.service';
import { AddAttendance } from '../../common/interface/payload.interface';
import * as moment from 'moment';
import { Attendance } from 'src/app/common/interface/attendance.interface';


@Component({
    selector: 'app-add-attendance',
    templateUrl: './add-attendance.component.html',
    styleUrls: ['./add-attendance.component.scss'],
})
export class AddAttendanceComponent implements OnInit {

    attendanceForm!: FormGroup;
    studentList: StudentAttendance[] = [];
    batchOptions: any[] = [
        {title: 'Select your batch', value: '', isSelected: true, isDisabled: true}
    ];
    isUpdate: boolean = false;
    selectedForUpdate: Attendance[] = [];

    constructor(private httpService: HttpService, public commonService: CommonService) { }

    ngOnInit() { 
        this.createForm();
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let day = new Date().getDate();
        console.log(new Date(year + '-' + (month + 1) + '-' + day).toLocaleString(), new Date(year + '-' + (month + 1) + '-' + (day + 1)).toLocaleDateString())
    }

    createForm(): void {
        this.attendanceForm = new FormGroup({
            class: new FormControl(''),
            batch: new FormControl('')
        });
    }

    getStudents(): void {
        this.httpService.getClassWiseStudentsForAttendance(this.attendanceForm.value.class, this.attendanceForm.value.batch, new Date().toISOString()).subscribe((data: ClassWiseStudentForAttendanceResponse) => {
            if (data) {
                this.studentList = data.data;
                this.studentList.forEach((element: any) => {
                    if (element.result.length > 0 && element.result[0].status) { 
                        element.isSelected = true;
                        this.isUpdate = true;
                    } 
                    else { 
                        element.isSelected = false;
                    }
                });
            }
        });
    }

    saveAttendance(): void {
        let payload: AddAttendance[] = [];
        if (!this.isUpdate) {
            this.studentList.forEach((element: Student) => {
                if (element) {
                    payload.push({ studentId: element._id, status: element.isSelected, date: new Date() });
                }
            });
    
            this.httpService.addAttendance(payload).subscribe((data: AddAttendanceResponse) => {
                if (data) {
                    this.commonService.showToaster('Added successfully!!');
                    this.commonService.redirect('home');
                }
            });
        } else {
            this.httpService.updateAttendance(this.selectedForUpdate).subscribe((data: any) => {
                if (data) {
                    this.commonService.showToaster('Added successfully!!');
                    this.commonService.redirect('home');
                }
            });
        }
    }

    getBatches(): void {
        this.studentList = [];
        this.batchOptions.splice(1, this.batchOptions.length);
        this.attendanceForm.patchValue({
            batch: ''
        });
        let batches = this.commonService.classesDetails.details.filter((d: any) => d.class == this.attendanceForm.value.class)[0].batches;
        batches.forEach((element: any) => {
            this.batchOptions.push({title: element.time, value: element.time});
        });
    }

    onChangeSelect(student: StudentAttendance): void {
        this.selectedForUpdate.push({ ...student.result[0], status: student.isSelected });
    }

}
