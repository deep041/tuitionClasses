import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectOption } from '../common/interface/common.interface';
import { CommonService } from '../common/services/common/common.service';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {

    inquiryForm!: FormGroup;

    constructor(private router: Router, public commonService: CommonService) { }

    ngOnInit() {
        this.createForm();
    }

    back(): void {
        window.history.back();
    }

    createForm(): void {
        this.inquiryForm = new FormGroup({
            class: new FormControl(''),
            board: new FormControl('')
        })
    }

    inquiry(): void {
        this.router.navigate(['/intro/inquiry'], {queryParams: { ...this.inquiryForm.value }});
    }

}
