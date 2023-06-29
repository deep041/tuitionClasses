import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppData } from '../common/interface/app-data.interface';
import { AppDataResponse } from '../common/interface/response.interface';
import { CommonService } from '../common/services/common/common.service';
import { HttpService } from '../common/services/http/http.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    constructor(private router: Router, public commonService: CommonService, private httpService: HttpService) { }

    ngOnInit() {
        this.getAppData();
    }

    getAppData(): void {
        this.httpService.appData(this.commonService.getLocalStorageData('isAdmin')).subscribe((data: AppDataResponse) => {
            if (data) {
                this.commonService.modules = data.data.modules;
            }
        });
    }

    goTo(url: string): void {
        this.router.navigate([url]);
    }

}
