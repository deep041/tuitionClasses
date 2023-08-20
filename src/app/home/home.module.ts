import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { ResultComponent } from './result/result.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { FeesComponent } from './fees/fees.component';
import { KitComponent } from './kit/kit.component';
import { MaterialComponent } from './material/material.component';
import { CommonSharedModule } from '../common/common.module';
import { SettingsComponent } from './settings/settings.component';
import { StudentsComponent } from './students/students.component';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddResultComponent } from './add-result/add-result.component';
import { DetailsComponent } from './details/details.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { AddKitDetailsComponent } from './add-kit-details/add-kit-details.component';
import { AddMaterialDetailsComponent } from './add-material-details/add-material-details.component';

const components = [
    HomeComponent,
    HeaderComponent,
    ResultComponent,
    AttendanceComponent,
    FeesComponent,
    KitComponent,
    MaterialComponent,
    SettingsComponent,
    StudentsComponent,
    AddAttendanceComponent,
    AddResultComponent,
    DetailsComponent,
    StudentDetailsComponent,
    AddKitDetailsComponent,
    AddMaterialDetailsComponent
]

@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        CommonSharedModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class HomeModule { }
