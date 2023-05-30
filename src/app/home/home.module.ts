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

const components = [
    HomeComponent,
    HeaderComponent,
    ResultComponent,
    AttendanceComponent,
    FeesComponent,
    KitComponent,
    MaterialComponent
]

@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        CommonSharedModule
    ]
})
export class HomeModule { }
