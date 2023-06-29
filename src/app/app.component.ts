import { Component, OnInit } from '@angular/core';
import { CommonService } from './common/services/common/common.service';
import { HttpService } from './common/services/http/http.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {

    constructor(private commonService: CommonService) {
    }
    
    ngOnInit() {
        if (this.commonService.getLocalStorageData('id')) {
            this.commonService.getUserData();
        }
    }
}
