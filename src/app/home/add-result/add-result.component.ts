import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddAttendance, AddResult } from 'src/app/common/interface/payload.interface';
import { AddAttendanceResponse, AddResultResponse, ClassWiseStudentResponse } from 'src/app/common/interface/response.interface';
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
    batchOptions: any[] = [
        {title: 'Select your batch', value: '', isSelected: true, isDisabled: true}
    ];
    subjectOptions: any[] = [
        {title: 'Select your subject', value: '', isSelected: true, isDisabled: true}
    ]

    constructor(private httpService: HttpService, public commonService: CommonService) { }

    ngOnInit() { 
        this.createForm();
    }

    createForm(): void {
        this.attendanceForm = new FormGroup({
            class: new FormControl(''),
            batch: new FormControl(''),
            subject: new FormControl(''),
            totalMarks: new FormControl('')
        });
    }

    getStudents(): void {
        this.httpService.getClassWiseStudents(this.attendanceForm.value.class, this.attendanceForm.value.batch).subscribe((data: ClassWiseStudentResponse) => {
            if (data) {
                this.studentList = data.data;
                this.studentList.forEach((element: Student) => element.marks = '' );
            }
        });
    }

    saveResult(): void {
        let payload: AddResult[] = [];
        this.studentList.forEach((element: Student) => {
            if (element) {
                payload.push({ studentId: element._id, marks: element.marks, date: new Date(), totalMarks: this.attendanceForm.value.totalMarks, subject: this.attendanceForm.value.subject });
            }
        });

        console.log('MArks', payload);

        this.httpService.addResult(payload).subscribe((data: AddResultResponse) => {
            if (data) {
                this.commonService.showToaster('Added successfully!!');
                this.commonService.redirect('home');
            }
        });
    }

    getBatches(): void {
        this.studentList = [];
        this.batchOptions.splice(1, this.batchOptions.length);
        this.attendanceForm.patchValue({
            batch: ''
        });
        let batches = this.commonService.classesDetails.details.filter((d: any) => d.class == this.attendanceForm.value.class)[0].batches;
        batches.forEach((element: any) => {
            this.batchOptions.push({title: element.time, value: element.time, isSelected: false});
        });


        this.subjectOptions.splice(1, this.subjectOptions.length);
        this.attendanceForm.patchValue({
            subject: ''
        });
        let subjects = this.commonService.classesDetails.details.filter((d: any) => d.class == this.attendanceForm.value.class)[0].subjects;
        subjects.forEach((element: any) => {
            this.subjectOptions.push({title: element, value: element});
        });
    }

}
