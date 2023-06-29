import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntroRoutingModule } from './intro-routing.module';
import { IntroComponent } from './intro.component';
import { CommonSharedModule } from '../common/common.module';
import { InquiryComponent } from './inquiry/inquiry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [IntroComponent, InquiryComponent],
    imports: [
        CommonModule,
        IntroRoutingModule,
        CommonSharedModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class IntroModule { }
