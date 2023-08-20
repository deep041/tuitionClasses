import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/services/common/common.service';
import { HttpService } from 'src/app/common/services/http/http.service';

@Component({
    selector: 'app-kit',
    templateUrl: './kit.component.html',
    styleUrls: ['./kit.component.scss'],
})
export class KitComponent implements OnInit {

    kitData: any[] = [];

    constructor(private commonService: CommonService, private httpService: HttpService) { }

    ngOnInit() { 
        this.getKit();
    }

    getKit(): void {
        this.httpService.getKit(this.commonService.getLocalStorageData('id')).subscribe((data: any) => {
            if (data) {
                this.kitData = data.data;
                console.log('KitData', this.kitData);
            }
        });
    }

}
