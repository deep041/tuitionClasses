import { Component, OnInit } from '@angular/core';
import { GroupedAttendance } from 'src/app/common/interface/attendance.interface';
import { GroupedAttendanceResponse } from 'src/app/common/interface/response.interface';
import { CommonService } from 'src/app/common/services/common/common.service';
import { HttpService } from 'src/app/common/services/http/http.service';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {

    displayAttendance!: GroupedAttendance[];

    constructor(private httpService: HttpService, public commonService: CommonService) { }

    ngOnInit() { 
        this.getAttendance();
    }

    getAttendance(): void {
        this.httpService.getAttendance(this.commonService.getLocalStorageData('id')).subscribe((response: GroupedAttendanceResponse) => {
            if (response) {
                this.displayAttendance = response.data;
                console.log('response response', this.displayAttendance);
            }
        });
    }

}
