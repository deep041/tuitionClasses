import { Component, OnInit } from '@angular/core';
import { Fees } from 'src/app/common/interface/fees.interface';
import { FeesResponse } from 'src/app/common/interface/response.interface';
import { CommonService } from 'src/app/common/services/common/common.service';
import { HttpService } from 'src/app/common/services/http/http.service';

@Component({
    selector: 'app-fees',
    templateUrl: './fees.component.html',
    styleUrls: ['./fees.component.scss'],
})
export class FeesComponent implements OnInit {

    feesDetails!: Fees;

    constructor(private httpService: HttpService, private commonService: CommonService) { }

    ngOnInit() { 
        this.getDetails();
    }

    async getDetails() {
        await this.httpService.getFeesDetails(this.commonService.getLocalStorageData('id')).subscribe((data: FeesResponse) => {
            if (data) {
                console.log('data', data);
                this.feesDetails = data.data;
            }
        });
    }
    
}
