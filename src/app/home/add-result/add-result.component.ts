import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddAttendance, AddResult } from 'src/app/common/interface/payload.interface';
import { AddAttendanceResponse, ClassWiseStudentResponse } from 'src/app/common/interface/response.interface';
import { Student } from 'src/app/common/interface/student.interface';
import { CommonService } from 'src/app/common/services/common/common.service';
import { HttpService } from 'src/app/common/services/http/http.service';

@Component({
    selector: 'app-add-result',
    templateUrl: './add-result.component.html',
    styleUrls: ['./add-result.component.scss'],
})
export class AddResultComponent implements OnInit {

    attendanceForm!: FormGroup;
    studentList: Student[] = [];

    constructor(private httpService: HttpService, public commonService: CommonService) { }

    ngOnInit() { 
        this.createForm();
    }

    createForm(): void {
        this.attendanceForm = new FormGroup({
            class: new FormControl(''),
            totalMarks: new FormControl('')
        });
    }

    getStudents(): void {
        this.httpService.getClassWiseStudents().subscribe((data: ClassWiseStudentResponse) => {
            if (data) {
                this.studentList = data.data;
                this.studentList.forEach((element: Student) => element.marks = '' );
            }
        })
    }

    saveAttendance(): void {
        let payload: AddResult[] = [];
        this.studentList.forEach((element: Student) => {
            if (element) {
                payload.push({ studentId: element._id, marks: element.marks, date: new Date(), totalMarks: this.attendanceForm.value.totalMarks, subject: 'Maths' });
            }
        });

        console.log('MArks', payload);

        // this.httpService.addAttendance(payload).subscribe((data: AddAttendanceResponse) => {
        //     if (data) {
        //         this.commonService.showToaster('Added successfully!!');
        //         this.commonService.redirect('home');
        //     }
        // });
    }

}
