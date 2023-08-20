import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http/http.service';

import { Class, Month, SelectOption } from '../../interface/common.interface';
import { Student } from '../../interface/student.interface';
import { StudentResponse } from '../../interface/response.interface';

@Injectable({
    providedIn: 'root'
})

export class CommonService {

    modules: any;
    user!: Student;
    newRegisterStudentData!: Student;
    classesDetails: any;
    selectedStudentDetails!: Student;

    months: Array<Month> = [
        { id: 1, month: 'January' },
        { id: 2, month: 'February' },
        { id: 3, month: 'March' },
        { id: 4, month: 'April' },
        { id: 5, month: 'May' },
        { id: 6, month: 'June' },
        { id: 7, month: 'July' },
        { id: 8, month: 'August' },
        { id: 9, month: 'September' },
        { id: 10, month: 'October' },
        { id: 11, month: 'November' },
        { id: 12, month: 'December' }
    ];

    classesOptions: SelectOption[] = [
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
    boardsOptions: SelectOption[] = [
        {title: 'Select your board', value: '', isSelected: true, isDisabled: true}, 
        {title: 'GSEB', value: 'GSEB'}, 
        {title: 'CBSE', value: 'CBSE'}
    ];

    classDetails: Class[] = [
        { 
            class: '6', 
            board: 'GSEB', 
            details: [
            { title: 'Subjects', value: ['Maths', 'Science', 'English', 'SS'] },
            { title: 'No. of Batches', value: 1 },
            { title: 'Timing', value: '6:15 PM - 8:15 PM' },
            { title: 'Schedule', value: '6:15 PM - 8:15 PM' },
            { title: 'Fees', value: '25,000/-', extraText: '(Registration fees: 10,000 + Tuition fees: 15,000)', notes: ['Registration fees have to be paid at the time of admission, which is 100% refundable in the trial period of the first 15 days if the student doesn\'t adjust to the institution.', 'For payment of tuition fees, you can either pay full payment or get facilitated with installments.'] }
        ],
        fees: 15000,
        registrationFees: 10000
    },
        { class: '6', board: 'CBSE', details: [
            { title: 'Subjects', value: ['Maths', 'Science', 'English', 'SS'] },
            { title: 'No. of Batches', value: 1 },
            { title: 'Timing', value: '6:15 PM - 8:15 PM' },
            { title: 'Schedule', value: '6:15 PM - 8:15 PM' },
            { title: 'Fees', value: '25,000/-', extraText: '(Registration fees: 10,000 + Tuition fees: 15,000)', notes: ['Registration fees have to be paid at the time of admission, which is 100% refundable in the trial period of the first 15 days if the student doesn\'t adjust to the institution.', 'For payment of tuition fees, you can either pay full payment or get facilitated with installments.'] }
        ],
        fees: 15000,
        registrationFees: 10000 },
        { class: '7', board: 'CBSE', details: [
            { title: 'Subjects', value: ['Maths', 'Science', 'English', 'SS'] },
            { title: 'No. of Batches', value: 1 },
            { title: 'Timing', value: '3:45 PM - 5:45 PM' },
            { title: 'Schedule', value: '3:45 PM - 5:45 PM' },
            { title: 'Fees', value: '30,000/-', extraText: '(Registration fees: 10,000 + Tuition fees: 20,000)', notes: ['Registration fees have to be paid at the time of admission, which is 100% refundable in the trial period of the first 15 days if the student doesn\'t adjust to the institution.', 'For payment of tuition fees, you can either pay full payment or get facilitated with installments.'] }
        ],
        fees: 20000,
        registrationFees: 10000 },
        { class: '7', board: 'GSEB', details: [
            { title: 'Subjects', value: ['Maths', 'Science', 'English', 'SS'] },
            { title: 'No. of Batches', value: 2 },
            { title: 'Timing', value: ['3:45 PM - 5:45 PM', '6:15 PM - 8:15 PM'] },
            { title: 'Schedule', value: ['3:45 PM - 5:45 PM', '6:15 PM - 8:15 PM'] },
            { title: 'Fees', value: '30,000/-', extraText: '(Registration fees: 10,000 + Tuition fees: 20,000)', notes: ['Registration fees have to be paid at the time of admission, which is 100% refundable in the trial period of the first 15 days if the student doesn\'t adjust to the institution.', 'For payment of tuition fees, you can either pay full payment or get facilitated with installments.'] }
        ],
        fees: 20000,
        registrationFees: 10000 },
        { class: '8', board: 'CBSE', details: [
            { title: 'Subjects', value: ['Maths', 'Science', 'English', 'SS'] },
            { title: 'No. of Batches', value: 1 },
            { title: 'Timing', value: '3:15 PM - 5:15 PM' },
            { title: 'Schedule', value: '3:15 PM - 5:15 PM' },
            { title: 'Fees', value: '35,000/-', extraText: '(Registration fees: 10,000 + Tuition fees: 25,000)', notes: ['Registration fees have to be paid at the time of admission, which is 100% refundable in the trial period of the first 15 days if the student doesn\'t adjust to the institution.', 'For payment of tuition fees, you can either pay full payment or get facilitated with installments.'] }
        ],
        fees: 25000,
        registrationFees: 10000 },
        { class: '8', board: 'GSEB', details: [
            { title: 'Subjects', value: ['Maths', 'Science', 'English', 'SS'] },
            { title: 'No. of Batches', value: 2 },
            { title: 'Timing', value: ['3:45 PM - 5:45 PM', '6:15 PM - 8:15 PM'] },
            { title: 'Schedule', value: ['3:45 PM - 5:45 PM', '6:15 PM - 8:15 PM'] },
            { title: 'Fees', value: '35,000/-', extraText: '(Registration fees: 10,000 + Tuition fees: 25,000)', notes: ['Registration fees have to be paid at the time of admission, which is 100% refundable in the trial period of the first 15 days if the student doesn\'t adjust to the institution.', 'For payment of tuition fees, you can either pay full payment or get facilitated with installments.'] }
        ],
        fees: 25000,
        registrationFees: 10000 },
        { class: '9', board: 'CBSE', details: [
            { title: 'Subjects', value: ['Maths', 'Science', 'English', 'SS'] },
            { title: 'No. of Batches', value: 2 },
            { title: 'Timing', value: '6:15 PM - 8:15 PM' },
            { title: 'Schedule', value: '6:15 PM - 8:15 PM' },
            { title: 'Fees', value: '40,000/-', extraText: '(Registration fees: 10,000 + Tuition fees: 30,000)', notes: ['Registration fees have to be paid at the time of admission, which is 100% refundable in the trial period of the first 15 days if the student doesn\'t adjust to the institution.', 'For payment of tuition fees, you can either pay full payment or get facilitated with installments.'] }
        ],
        fees: 30000,
        registrationFees: 10000 },
        { class: '9', board: 'GSEB', details: [
            { title: 'Subjects', value: ['Maths', 'Science', 'English', 'SS'] },
            { title: 'No. of Batches', value: 2 },
            { title: 'Timing', value: ['3:45 PM - 5:45 PM', '6:15 PM - 8:15 PM'] },
            { title: 'Schedule', value: ['3:45 PM - 5:45 PM', '6:15 PM - 8:15 PM'] },
            { title: 'Fees', value: '40,000/-', extraText: '(Registration fees: 10,000 + Tuition fees: 30,000)', notes: ['Registration fees have to be paid at the time of admission, which is 100% refundable in the trial period of the first 15 days if the student doesn\'t adjust to the institution.', 'For payment of tuition fees, you can either pay full payment or get facilitated with installments.'] }
        ] ,
        fees: 30000,
        registrationFees: 10000},
        { class: '10', board: 'CBSE', details: [
            { title: 'Subjects', value: ['Maths', 'Science', 'English', 'SS'] },
            { title: 'No. of Batches', value: 2 },
            { title: 'Timing', value: ['3:45 PM - 5:45 PM', '6:15 PM - 8:15 PM'] },
            { title: 'Schedule', value: ['3:45 PM - 5:45 PM', '6:15 PM - 8:15 PM'] },
            { title: 'Fees', value: '45,000/-', extraText: '(Registration fees: 10,000 + Tuition fees: 35,000)', notes: ['Registration fees have to be paid at the time of admission, which is 100% refundable in the trial period of the first 15 days if the student doesn\'t adjust to the institution.', 'For payment of tuition fees, you can either pay full payment or get facilitated with installments.'] }
        ],
        fees: 35000,
        registrationFees: 10000 },
        { class: '10', board: 'GSEB', details: [
            { title: 'Subjects', value: ['Maths', 'Science', 'English', 'SS'] },
            { title: 'No. of Batches', value: 3 },
            { title: 'Timing', value: ['3:45 PM - 5:45 PM', '3:45 PM - 5:45 PM', '6:15 PM - 8:15 PM'] },
            { title: 'Schedule', value: ['3:45 PM - 5:45 PM', '3:45 PM - 5:45 PM', '6:15 PM - 8:15 PM'] },
            { title: 'Fees', value: '45,000/-', extraText: '(Registration fees: 10,000 + Tuition fees: 35,000)', notes: ['Registration fees have to be paid at the time of admission, which is 100% refundable in the trial period of the first 15 days if the student doesn\'t adjust to the institution.', 'For payment of tuition fees, you can either pay full payment or get facilitated with installments.'] }
        ],
        fees: 35000,
        registrationFees: 10000 },
        { class: '11-A', board: 'GSEB', details: [
            { title: 'Subjects', value: ['Physics', 'Chemistry', 'Maths'] },
            { title: 'Courses', value: 'Board + GUJCET + JEE(MAINS & ADVANCED)' },
            { title: 'No. of Batches', value: 1 },
            { title: 'Timing', value: '3:30 PM - 8:30 PM' },
            { title: 'Schedule', value: '3:30 PM - 8:30 PM' },
            { title: 'Fees', value: '90,000/-', extraText: '(Registration fees: 30,000 + Tuition fees: 60,000)', notes: ['Registration fees have to be paid at the time of admission, which is 100% refundable in the trial period of the first 15 days if the student doesn\'t adjust to the institution.', 'For payment of tuition fees, you can either pay full payment or get facilitated with installments.'] }
        ],
        fees: 60000,
        registrationFees: 30000 },
        { class: '11-A', board: 'CBSE', details: [
            { title: 'Subjects', value: ['Physics', 'Chemistry', 'Maths'] },
            { title: 'Courses', value: 'Board + GUJCET + JEE(MAINS & ADVANCED)' },
            { title: 'No. of Batches', value: 1 },
            { title: 'Timing', value: '3:30 PM - 8:30 PM' },
            { title: 'Schedule', value: '3:30 PM - 8:30 PM' },
            { title: 'Fees', value: '90,000/-', extraText: '(Registration fees: 30,000 + Tuition fees: 60,000)', notes: ['Registration fees have to be paid at the time of admission, which is 100% refundable in the trial period of the first 15 days if the student doesn\'t adjust to the institution.', 'For payment of tuition fees, you can either pay full payment or get facilitated with installments.'] }
        ],
        fees: 60000,
        registrationFees: 30000 },
        { class: '11-B', board: 'GSEB', details: [
            { title: 'Subjects', value: ['Physics', 'Chemistry', 'Biology'] },
            { title: 'Courses', value: 'Board + GUJCET + NEET(UG)' },
            { title: 'No. of Batches', value: 1 },
            { title: 'Timing', value: '3:30 PM - 8:30 PM' },
            { title: 'Schedule', value: '3:30 PM - 8:30 PM' },
            { title: 'Fees', value: '90,000/-', extraText: '(Registration fees: 30,000 + Tuition fees: 60,000)', notes: ['Registration fees have to be paid at the time of admission, which is 100% refundable in the trial period of the first 15 days if the student doesn\'t adjust to the institution.', 'For payment of tuition fees, you can either pay full payment or get facilitated with installments.'] }
        ],
        fees: 60000,
        registrationFees: 30000},
        { class: '11-B', board: 'CBSE', details: [
            { title: 'Subjects', value: ['Physics', 'Chemistry', 'Biology'] },
            { title: 'Courses', value: 'Board + GUJCET + NEET(UG)' },
            { title: 'No. of Batches', value: 1 },
            { title: 'Timing', value: '3:30 PM - 8:30 PM' },
            { title: 'Schedule', value: '3:30 PM - 8:30 PM' },
            { title: 'Fees', value: '90,000/-', extraText: '(Registration fees: 30,000 + Tuition fees: 60,000)', notes: ['Registration fees have to be paid at the time of admission, which is 100% refundable in the trial period of the first 15 days if the student doesn\'t adjust to the institution.', 'For payment of tuition fees, you can either pay full payment or get facilitated with installments.'] }
        ],
        fees: 60000,
        registrationFees: 30000 },
        { class: '12-A', board: 'GSEB', details: [
            { title: 'Subjects', value: ['Physics', 'Chemistry', 'Maths'] },
            { title: 'Courses', value: 'Board + GUJCET + JEE(MAINS & ADVANCED)' },
            { title: 'No. of Batches', value: 1 },
            { title: 'Timing', value: '3:30 PM - 8:30 PM' },
            { title: 'Schedule', value: '3:30 PM - 8:30 PM' },
            { title: 'Fees', value: '1,00,000/-', extraText: '(Registration fees: 30,000 + Tuition fees: 70,000)', notes: ['Registration fees have to be paid at the time of admission, which is 100% refundable in the trial period of the first 15 days if the student doesn\'t adjust to the institution.', 'For payment of tuition fees, you can either pay full payment or get facilitated with installments.'] }
        ],
        fees: 70000,
        registrationFees: 30000 },
        { class: '12-A', board: 'CBSE', details: [
            { title: 'Subjects', value: ['Physics', 'Chemistry', 'Maths'] },
            { title: 'Courses', value: 'Board + GUJCET + JEE(MAINS & ADVANCED)' },
            { title: 'No. of Batches', value: 1 },
            { title: 'Timing', value: '3:30 PM - 8:30 PM' },
            { title: 'Schedule', value: '3:30 PM - 8:30 PM' },
            { title: 'Fees', value: '1,00,000/-', extraText: '(Registration fees: 30,000 + Tuition fees: 70,000)', notes: ['Registration fees have to be paid at the time of admission, which is 100% refundable in the trial period of the first 15 days if the student doesn\'t adjust to the institution.', 'For payment of tuition fees, you can either pay full payment or get facilitated with installments.'] }
        ],
        fees: 70000,
        registrationFees: 30000 },
        { class: '12-B', board: 'GSEB', details: [
            { title: 'Subjects', value: ['Physics', 'Chemistry', 'Maths'] },
            { title: 'Courses', value: 'Board + GUJCET + JEE(MAINS & ADVANCED)' },
            { title: 'No. of Batches', value: 1 },
            { title: 'Timing', value: '3:30 PM - 8:30 PM' },
            { title: 'Schedule', value: '3:30 PM - 8:30 PM' },
            { title: 'Fees', value: '1,00,000/-', extraText: '(Registration fees: 30,000 + Tuition fees: 70,000)', notes: ['Registration fees have to be paid at the time of admission, which is 100% refundable in the trial period of the first 15 days if the student doesn\'t adjust to the institution.', 'For payment of tuition fees, you can either pay full payment or get facilitated with installments.'] }
        ],
        fees: 70000,
        registrationFees: 30000 },
        { class: '12-B', board: 'CBSE', details: [
            { title: 'Subjects', value: ['Physics', 'Chemistry', 'Maths'] },
            { title: 'Courses', value: 'Board + GUJCET + JEE(MAINS & ADVANCED)' },
            { title: 'No. of Batches', value: 1 },
            { title: 'Timing', value: '3:30 PM - 8:30 PM' },
            { title: 'Schedule', value: '3:30 PM - 8:30 PM' },
            { title: 'Fees', value: '1,00,000/-', extraText: '(Registration fees: 30,000 + Tuition fees: 70,000)', notes: ['Registration fees have to be paid at the time of admission, which is 100% refundable in the trial period of the first 15 days if the student doesn\'t adjust to the institution.', 'For payment of tuition fees, you can either pay full payment or get facilitated with installments.'] }
        ],
        fees: 70000,
        registrationFees: 30000 }
    ];

    subjects: any = [
        { name: 'Maths', value: 'Maths', stander: [] },
        { name: 'Science', value: 'Science' },
        { name: 'English', value: 'English' },
        { name: 'SS', value: 'SS' },
        { name: 'Physics', value: 'Physics' },
        { name: 'Chemistry', value: 'Chemistry' },
        { name: 'Biology', value: 'Biology' }
    ]
    

    constructor(private router: Router, private httpService: HttpService) { }

    showToaster(message: string): void {
        let x: any = document.getElementById("snackbar");
        x.innerHTML = message;
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    redirect(location: String): void {
        this.router.navigate([location]);
    }

    setLocalStorageData(title: string, data: any): void {
        localStorage.setItem(title, data);
    }

    getLocalStorageData(title: string): any {
        return localStorage.getItem(title);
    }

    getUserData() {
        this.httpService.getUserData(this.getLocalStorageData('id')).subscribe((data: StudentResponse) => {
            if (data) {
                this.user = data.data;
                console.log('user', this.user)
            }
        });
    }

    getMonth(id: number): string {
        return this.months.filter((data: Month) => data.id === id)[0].month;
    }

    clearLocalStorage(): void {
        localStorage.clear();
    }
}
