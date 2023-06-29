import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Class } from 'src/app/common/interface/common.interface';
import { FeesResponse, StudentResponse } from 'src/app/common/interface/response.interface';
import { CommonService } from 'src/app/common/services/common/common.service';
import { HttpService } from 'src/app/common/services/http/http.service';

export interface FeesDetails {
    fees: number,
    registrationFees: number
}

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

    paymentForm!: FormGroup;
    fees: FeesDetails = {
        fees: 0,
        registrationFees: 0
    };

    constructor(private fb: FormBuilder, private httpService: HttpService, private commonService: CommonService) { }

    ngOnInit() { 
        let selectedClass = this.commonService.classDetails.filter((d: Class) => d.class === this.commonService.newRegisterStudentData.class && d.board === this.commonService.newRegisterStudentData.board)[0];

        this.fees.registrationFees = selectedClass.registrationFees;
        this.fees.fees =  selectedClass.fees;

        this.createForm();
    }

    createForm(): void {
        this.paymentForm = this.fb.group({
            registrationFee: [''],
            discount: [''],
            fees: this.fb.array([
                this.fb.group({
                    fee: ['']
                })
            ])
        });

        this.paymentForm.patchValue({
            registrationFee: this.fees.registrationFees
        });

        this.addNewPart();

        this.paymentForm.controls['discount'].valueChanges.subscribe(value => {
            this.fillValue();
        });
    }

    getControls() {
        return (this.paymentForm.get('fees') as FormArray).controls;
    }

    getFormArray() {
        return (this.paymentForm.get('fees') as FormArray);
    }

    fillValue(): void {
        let feeValue = (this.fees.fees - (this.paymentForm.get('discount')?.value ? (Number(this.paymentForm.get('discount')?.value)) : 0)) / this.getControls().length;

        // this.fees.fees / this.getControls().length
        this.getControls().forEach((controls: any) => {
            controls.patchValue({
                fee: feeValue
            })
        });
    }

    addNewPart(): void {
        this.getFormArray().push(
            this.fb.group({
                fee: ['']
            })
        )

        this.fillValue();
    }

    removePart(): void {
        this.getFormArray().removeAt(this.getFormArray().length - 1);
        this.fillValue();
    }

    saveFees(): void {

        this.httpService.register(this.commonService.newRegisterStudentData).subscribe((data: StudentResponse) => {
            if (data.status === 200) {
                console.log(data);
                let payload = {
                    ...this.paymentForm.value,
                    studentId: data.data._id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    totalFees: this.fees.fees,
                    feesPartitions: this.getFormArray().length
                }

                this.httpService.addFees(payload).subscribe((feesData: FeesResponse) => {
                    if (feesData.status === 200) {
                        this.commonService.showToaster(data.message);     
                    }
                });
        
                console.log('payload', JSON.stringify(payload));
                // this.commonService.showToaster(data.message);
            } else {
                this.commonService.showToaster(data.message);
            }
        });


    }
}
