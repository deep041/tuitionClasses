import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentResponse } from '../common/interface/response.interface';
import { CommonService } from '../common/services/common/common.service';
import { HttpService } from '../common/services/http/http.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;

    constructor(private router: Router, private httpService: HttpService, private commonService: CommonService) { }

    ngOnInit() {
        this.createForm();
     }

    login(): void {
        if (this.loginForm.valid) {
            this.httpService.login(this.loginForm.value).subscribe((data: StudentResponse) => {
                console.log(data);
                if (data.status === 200) {
                    this.commonService.user = data.data;
                    this.commonService.setLocalStorageData('id', this.commonService.user._id);
                    this.commonService.setLocalStorageData('isAdmin', this.commonService.user.isAdmin);
                    this.goTo();
                } else {
                    this.commonService.showToaster('User not found!!');
                }
            });
        }
    }

    goTo(): void {
        this.router.navigate(['/home']);
    }

    createForm(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('aq@email.com', [Validators.required]),
            password: new FormControl('1234', [Validators.required])
        });
    }

}
