import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
        this.httpService.appData().subscribe((data: any) => {
            if (data) {
                console.log(data);
                this.commonService.modules = data.data.modules;
            }
        });
        console.log('common service', this.commonService.modules);
    }

    goTo(url: string): void {
        this.router.navigate([url]);
    }

}
