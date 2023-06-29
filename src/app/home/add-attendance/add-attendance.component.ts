import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectOption } from 'src/app/common/interface/common.interface';
import { AddAttendanceResponse, ClassWiseStudentResponse } from 'src/app/common/interface/response.interface';
import { Student } from 'src/app/common/interface/student.interface';
import { CommonService } from 'src/app/common/services/common/common.service';
import { HttpService } from 'src/app/common/services/http/http.service';
import { AddAttendance } from '../../common/interface/payload.interface';

@Component({
    selector: 'app-add-attendance',
    templateUrl: './add-attendance.component.html',
    styleUrls: ['./add-attendance.component.scss'],
})
export class AddAttendanceComponent implements OnInit {

    attendanceForm!: FormGroup;
    studentList: Student[] = [];

    constructor(private httpService: HttpService, public commonService: CommonService) { }

    ngOnInit() { 
        this.createForm();
    }

    createForm(): void {
        this.attendanceForm = new FormGroup({
            class: new FormControl('')
        });
    }

    getStudents(): void {
        this.httpService.getClassWiseStudents().subscribe((data: ClassWiseStudentResponse) => {
            if (data) {
                this.studentList = data.data;
                this.studentList.forEach((element: Student) => element.isSelected = false );
            }
        })
    }

    saveAttendance(): void {
        let payload: AddAttendance[] = [];
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
    }

}
