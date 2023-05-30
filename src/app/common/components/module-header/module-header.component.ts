import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-module-header',
    templateUrl: './module-header.component.html',
    styleUrls: ['./module-header.component.scss'],
})
export class ModuleHeaderComponent implements OnInit {

    @Input() title!: string;
    @Input() class!: string;

    constructor() { }

    ngOnInit() { }

    back(): void {
        history.back();
    }

}
