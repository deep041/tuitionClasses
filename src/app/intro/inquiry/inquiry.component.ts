import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class } from 'src/app/common/interface/common.interface';
import { CommonService } from 'src/app/common/services/common/common.service';

@Component({
    selector: 'app-inquiry',
    templateUrl: './inquiry.component.html',
    styleUrls: ['./inquiry.component.scss'],
})
export class InquiryComponent implements OnInit {

    data!: Class[];
    displayData!: Class;


    constructor(private route: ActivatedRoute, private commonService: CommonService) { }

    ngOnInit() {
        this.classData();
        // this.displayData = this.data[0];

        let className = this.route.snapshot.queryParamMap.get('class');
        let boardName = this.route.snapshot.queryParamMap.get('board');

        this.displayData = this.data.filter((d: Class) => d.class === className && d.board === boardName)[0];
     }

    classData(): void {
        this.data = this.commonService.classDetails;
    }

    isArray(value: any): boolean {
        return value instanceof Array;
    }

}
