import { Component, OnInit } from '@angular/core';
import { AllStudentResponse } from 'src/app/common/interface/response.interface';
import { Student } from 'src/app/common/interface/student.interface';
import { HttpService } from 'src/app/common/services/http/http.service';

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {

    students!: Student[];

    constructor(private httpService: HttpService) { }

    ngOnInit() { 
        this.httpService.getAllStudents().subscribe((data: AllStudentResponse) => {
            console.log('data', data);
            if (data.status === 200) {
                this.students = data.data;
            }
        });
    }

}
