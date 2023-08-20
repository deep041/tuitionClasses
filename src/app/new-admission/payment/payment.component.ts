import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Class } from 'src/app/common/interface/common.interface';
import { FeesResponse, StudentResponse } from 'src/app/common/interface/response.interface';
import { CommonService } from 'src/app/common/services/common/common.service';
import { HttpService } from 'src/app/common/services/http/http.service';

declare var Razorpay: any;

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

    razorPayOptions = {
        "key": '',
        "amount": 0,
        "currency": "INR",
        "name": "",
        "description": "My Payment",
        "order_id": "",
        "handler": (res: any) => {
            console.log(res);
        }
    }

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
                        this.commonService.redirect('login');  
                    }
                });
        
                console.log('payload', JSON.stringify(payload));
                // this.commonService.showToaster(data.message);
            } else {
                this.commonService.showToaster(data.message);
            }
        });
    }

    razorpayPayment(): void {
        this.httpService.razorPayPayment({amount: this.fees.registrationFees}).subscribe((data: any) => {
            if (data) {
                this.razorPayOptions.key = data.key;
                this.razorPayOptions.amount = data.data.amount;
                this.razorPayOptions.name = 'Chintan Classes';
                this.razorPayOptions.order_id = data.data.id;
                this.razorPayOptions.handler = this.razorPayHandler.bind(this)
                let rzpl = new Razorpay(this.razorPayOptions);
                rzpl.open();
                console.log('opened');
            }
        });
    }

    razorPayHandler(response: any): void {
        console.log('response', response);
        let razorpayData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
        }

        this.httpService.register(this.commonService.newRegisterStudentData).subscribe((data: StudentResponse) => {
            if (data.status === 200) {
                console.log(data);
                let payload = {
                    studentId: data.data._id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    totalFees: this.fees.fees,
                    type: 'Registration Fee',
                    isPaid: true,
                    ...razorpayData
                }

                this.httpService.addFees(payload).subscribe((feesData: FeesResponse) => {
                    if (feesData.status === 200) {
                        this.commonService.showToaster(data.message);   
                        this.commonService.redirect('login');  
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
