import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/services/common/common.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

    constructor(public commonService: CommonService) { }

    ngOnInit() { }

}
