import { Component, OnInit } from '@angular/core';
import { HttpService } from '../common/services/http/http.service';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    back(): void {
        window.history.back();
    }

}
