import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Student } from 'src/app/common/interface/student.interface';
import { CommonService } from 'src/app/common/services/common/common.service';
import { HttpService } from 'src/app/common/services/http/http.service';

@Component({
    selector: 'app-add-material-details',
    templateUrl: './add-material-details.component.html',
    styleUrls: ['./add-material-details.component.scss'],
})
export class AddMaterialDetailsComponent implements OnInit {

    materialForm!: FormGroup;
    studentList: any[] = [];
    isUpdate: boolean = false;
    batchOptions: any[] = [
        { title: 'Select your batch', value: '', isSelected: true, isDisabled: true }
    ];
    subjectOptions: any[] = [
        { title: 'Select your subject', value: '', isSelected: true, isDisabled: true }
    ]
    selectedForUpdate: any[] = [];

    constructor(private httpService: HttpService, public commonService: CommonService) { }

    ngOnInit() {
        this.createForm();
    }

    createForm(): void {
        this.materialForm = new FormGroup({
            class: new FormControl(''),
            batch: new FormControl(''),
            subject: new FormControl('')
        });
    }

    getStudents(): void {
        this.httpService.getClassWiseStudentsForMaterial(this.materialForm.value.class, this.materialForm.value.batch, this.materialForm.value.subject).subscribe((data: any) => {
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

    saveMaterial(): void {
        if (!this.isUpdate) {

            let payload: any[] = [];
            this.studentList.forEach((element: any) => {
                if (element) {
                    payload.push({ studentId: element._id, status: element.isSelected ? true : false, date: new Date(), subject: this.materialForm.value.subject });
                }
            });

            this.httpService.addMaterial(payload).subscribe((data: any) => {
                if (data) {
                    this.commonService.showToaster('Added successfully!!');
                    this.commonService.redirect('home');
                }
            });
        } else {
            this.httpService.updateMaterial(this.selectedForUpdate).subscribe((data: any) => {
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
        this.materialForm.patchValue({
            batch: ''
        });
        let batches = this.commonService.classesDetails.details.filter((d: any) => d.class == this.materialForm.value.class)[0].batches;
        batches.forEach((element: any) => {
            this.batchOptions.push({ title: element.time, value: element.time, isSelected: false });
        });

        this.subjectOptions.splice(1, this.subjectOptions.length);
        this.materialForm.patchValue({
            subject: ''
        });
        let subjects = this.commonService.classesDetails.details.filter((d: any) => d.class == this.materialForm.value.class)[0].subjects;
        subjects.forEach((element: any) => {
            this.subjectOptions.push({ title: element, value: element });
        });
    }

    onChangeSelect(student: any): void {
        console.log(this.selectedForUpdate);
        this.selectedForUpdate.push({ ...student.result[0], status: student.isSelected ? true : false, subject: this.materialForm.value.subject });
    }

}
