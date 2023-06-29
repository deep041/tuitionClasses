import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common/services/common/common.service';
import { HttpService } from '../common/services/http/http.service';

@Component({
    selector: 'app-starter',
    templateUrl: './starter.component.html',
    styleUrls: ['./starter.component.scss'],
})
export class StarterComponent implements OnInit {

    constructor(private router: Router, private httpService: HttpService, private commonService: CommonService) { }

    ngOnInit() {
    }

    goTo(page: string):void {
        this.router.navigate([page]);
    }

}
