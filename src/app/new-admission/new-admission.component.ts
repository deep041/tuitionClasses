import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common/services/common/common.service';
import { HttpService } from '../common/services/http/http.service';

@Component({
    selector: 'app-new-admission',
    templateUrl: './new-admission.component.html',
    styleUrls: ['./new-admission.component.scss'],
})
export class NewAdmissionComponent implements OnInit {

    admissionForm!: FormGroup;
    boardsOptions: any = [
        { title: 'Select your board', value: '', isSelected: true, isDisabled: true }, 
        { title: 'GSEB', value: 'GSEB' }, 
        { title: 'CBSE', value: 'CBSE' }
    ];
    classesOptions: any = [
        { title: 'Select your class', value: '', isSelected: true, isDisabled: true }, 
        { title: '6', value: '6' },
        { title: '7', value: '7' },
        { title: '8', value: '8' },
        { title: '9', value: '9' },
        { title: '10', value: '10' },
        { title: '11-A', value: '11-A' },
        { title: '11-B', value: '11-B' },
        { title: '12-A', value: '12-A' },
        { title: '12-B', value: '12-B' },
    ];
    genderOptions: any = [
        { title: 'Select your gender', value: '', isSelected: true, isDisabled: true },
        { title: 'Male', value: 'Male' },
        { title: 'Female', value: 'Female' }
    ];
    batchOptions: any = [
        { title: 'Select your batch', value: '', isSelected: true, isDisabled: true }
    ];
    dobType: string = 'text';

    constructor(private httpService: HttpService, public commonService: CommonService) { }

    ngOnInit() { 
        this.createForm();
    }

    createForm(): void {
        this.admissionForm = new FormGroup({
            surname: new FormControl('', [Validators.required]),
            firstName: new FormControl('', [Validators.required]),
            secondName: new FormControl('', [Validators.required]),
            dob: new FormControl('', [Validators.required]),
            board: new FormControl('', [Validators.required]),
            class: new FormControl('', [Validators.required]),
            batch: new FormControl(''),
            gender: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required]),
            fatherNumber: new FormControl(''),
            motherNumber: new FormControl(''),
            otherNumber: new FormControl(''),
            whatsAppNumber: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            parentsOccupation: new FormControl('', [Validators.required]),
            parentsOccupationAddress: new FormControl('', [Validators.required]),
            presentSchool: new FormControl('', [Validators.required]),
            previousResult: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }

    register(): void {
        if (this.admissionForm.valid) {
            this.commonService.newRegisterStudentData = this.admissionForm.value;
            this.commonService.redirect('admission/payment');
            // this.httpService.register(this.admissionForm.value).subscribe((data: any) => {
            //     if (data.status === 200) {
            //         console.log(data);
            //         this.commonService.showToaster(data.message);
            //     } else {
            //         this.commonService.showToaster(data.message);
            //     }
            // });
        }
    }

    getBatches(): void {
        if (this.admissionForm.value.class) {
            this.batchOptions.splice(1, this.batchOptions.length);
            this.admissionForm.patchValue({
                batch: ''
            });
            let batches = this.commonService.classesDetails.details.filter((d: any) => d.class == this.admissionForm.value.class)[0].batches;
            batches.forEach((element: any) => {
                this.batchOptions.push({ title: element.time, value: element.time, isSelected: false });
            });
        }
    }

    dobClick(): void {
        this.dobType = 'date';
        setTimeout(() => {
            let dob = document.getElementById('dob');
            // document.getElementById('dob')?.click();
        }, 100);
    }
}
