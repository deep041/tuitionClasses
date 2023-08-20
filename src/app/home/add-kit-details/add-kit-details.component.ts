import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Attendance } from 'src/app/common/interface/attendance.interface';
import { AddAttendance } from 'src/app/common/interface/payload.interface';
import { AddAttendanceResponse, ClassWiseStudentForAttendanceResponse } from 'src/app/common/interface/response.interface';
import { Student, StudentAttendance } from 'src/app/common/interface/student.interface';
import { CommonService } from 'src/app/common/services/common/common.service';
import { HttpService } from 'src/app/common/services/http/http.service';

@Component({
    selector: 'app-add-kit-details',
    templateUrl: './add-kit-details.component.html',
    styleUrls: ['./add-kit-details.component.scss'],
})
export class AddKitDetailsComponent implements OnInit {

    kitForm!: FormGroup;
    studentList: any[] = [];
    batchOptions: any[] = [
        { title: 'Select your batch', value: '', isSelected: true, isDisabled: true }
    ];
    isUpdate: boolean = false;
    selectedForUpdate: any[] = [];
    kitOptions: any[] = [
        { title: 'Select kit', value: '', isSelected: true, isDisabled: true },
        { title: 'Bag', value: 'Bag' },
        { title: 'T-Shirt', value: 'T-shirt' },
    ];

    constructor(private httpService: HttpService, public commonService: CommonService) { }

    ngOnInit() { 
        this.createForm();
    }

    createForm(): void {
        this.kitForm = new FormGroup({
            class: new FormControl(''),
            batch: new FormControl(''),
            kit: new FormControl('')
        });
    }

    getStudents(): void {
        this.httpService.getClassWiseStudentsForKit(this.kitForm.value.class, this.kitForm.value.batch, this.kitForm.value.kit).subscribe((data: any) => {
            if (data) {
                this.studentList = data.data;
                this.studentList.forEach((element: any) => {
                    if (element.result.length > 0 && element.result[0].status) { 
                        element.isSelected = true;
                        this.isUpdate = true;
                    } 
                    else { 
                        element.isSelected = false;
                    }
                });
            }
        });
    }

    saveKit(): void {
        let payload: any[] = [];
        if (!this.isUpdate) {
            this.studentList.forEach((element: Student) => {
                if (element) {
                    payload.push({ studentId: element._id, status: element.isSelected ? true : false, date: new Date(), kitType: this.kitForm.value.kit });
                }
            });
    
            this.httpService.addKit(payload).subscribe((data: any) => {
                if (data) {
                    this.commonService.showToaster('Added successfully!!');
                    this.commonService.redirect('home');
                }
            });
        } else {
            this.httpService.updateKit(this.selectedForUpdate).subscribe((data: any) => {
                if (data) {
                    this.commonService.showToaster('Added successfully!!');
                    this.commonService.redirect('home');
                }
            });
        }
    }

    getBatches(): void {
        this.studentList = [];
        this.batchOptions.splice(1, this.batchOptions.length);
        this.kitForm.patchValue({
            batch: ''
        });
        let batches = this.commonService.classesDetails.details.filter((d: any) => d.class == this.kitForm.value.class)[0].batches;
        batches.forEach((element: any) => {
            this.batchOptions.push({title: element.time, value: element.time});
        });
    }

    onChangeSelect(student: any): void {
        console.log(this.selectedForUpdate);
        this.selectedForUpdate.push({ ...student.result[0], status: student.isSelected ? true : false, kitType: this.kitForm.value.kit });
    }

}
