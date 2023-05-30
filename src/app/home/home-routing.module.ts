import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { FeesComponent } from './fees/fees.component';
import { HomeComponent } from './home.component';
import { KitComponent } from './kit/kit.component';
import { MaterialComponent } from './material/material.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'result', component: ResultComponent },
    { path: 'fees', component: FeesComponent },
    { path: 'attendance', component: AttendanceComponent },
    { path: 'kit', component: KitComponent },
    { path: 'material', component: MaterialComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
