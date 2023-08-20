import { Component, OnInit } from '@angular/core';
import { GroupedResultResponse } from 'src/app/common/interface/response.interface';
import { GroupedResult } from 'src/app/common/interface/result.interface';
import { CommonService } from 'src/app/common/services/common/common.service';
import { HttpService } from 'src/app/common/services/http/http.service';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {

    displayResult!: GroupedResult[];

    constructor(private httpService: HttpService, private commonService: CommonService) { }

    ngOnInit() { 
        this.getResult();
    }

    getResult(): void {
        this.httpService.getResult(this.commonService.getLocalStorageData('id')).subscribe((response: GroupedResultResponse) => {
            if (response) {
                this.displayResult = response.data;
                console.log('response response', this.displayResult);
            }
        });
    }

}
