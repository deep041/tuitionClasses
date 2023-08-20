import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/services/common/common.service';
import { HttpService } from 'src/app/common/services/http/http.service';

@Component({
    selector: 'app-student-details',
    templateUrl: './student-details.component.html',
    styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {

    studentDetails: any;

    constructor(public commonService: CommonService, private httpService: HttpService) { }

    ngOnInit() { 
        this.getStudentData();
    }

    getStudentData(): void {
        this.httpService.getStudentFullDetails(this.commonService.selectedStudentDetails._id).subscribe((data: any) => {
            if (data) {
                this.studentDetails = data.data[0];
                console.log('data', data, this.studentDetails);

            }
        });
    }

    getCount(attendance: any, type: boolean): void {
        return attendance.filter((a: any) => a.status === type ).length;
    }

}
