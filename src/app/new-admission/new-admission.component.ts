import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-new-admission',
    templateUrl: './new-admission.component.html',
    styleUrls: ['./new-admission.component.scss'],
})
export class NewAdmissionComponent implements OnInit {

    admissionForm!: FormGroup;
    boardsOptions: any = [
        {title: 'Select your board', value: '', isSelected: true, isDisabled: true}, 
        {title: 'GSEB', value: 'GSEB'}, 
        {title: 'CBSE', value: 'CBSE'}
    ];
    classesOptions: any = [
        {title: 'Select your class', value: '', isSelected: true, isDisabled: true}, 
        {title: '6', value: '6'}, 
        {title: '7', value: '7'},
        {title: '8', value: '8'},
        {title: '9', value: '9'},
        {title: '10', value: '10'},
        {title: '11-A', value: '11-A'},
        {title: '11-B', value: '11-B'},
        {title: '12-A', value: '12-A'},
        {title: '12-B', value: '12-B'},
    ];

    constructor() { }

    ngOnInit() { 
        this.createForm();
    }

    createForm(): void {
        this.admissionForm = new FormGroup({
            surname: new FormControl(''),
            firstName: new FormControl(''),
            secondName: new FormControl(''),
            board: new FormControl(''),
            class: new FormControl('')
        });
    }

}
