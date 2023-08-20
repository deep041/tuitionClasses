import { Component, OnInit } from '@angular/core';
import { AllStudentResponse } from 'src/app/common/interface/response.interface';
import { Student, StudentAndClassGrouped } from 'src/app/common/interface/student.interface';
import { CommonService } from 'src/app/common/services/common/common.service';
import { HttpService } from 'src/app/common/services/http/http.service';

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {

    classes!: StudentAndClassGrouped[];

    constructor(private httpService: HttpService, public commonService: CommonService) { }

    ngOnInit() { 
        this.httpService.getAllStudents().subscribe((data: AllStudentResponse) => {
            console.log('data', data);
            if (data.status === 200) {
                this.classes = data.data;
            }
        });
    }

    redirect(student: Student): void {
        this.commonService.selectedStudentDetails = student;
        this.commonService.redirect('home/student/details');
    }

}
