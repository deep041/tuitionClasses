import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';
import { AddKitDetailsComponent } from './add-kit-details/add-kit-details.component';
import { AddMaterialDetailsComponent } from './add-material-details/add-material-details.component';
import { AddResultComponent } from './add-result/add-result.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { DetailsComponent } from './details/details.component';
import { FeesComponent } from './fees/fees.component';
import { HomeComponent } from './home.component';
import { KitComponent } from './kit/kit.component';
import { MaterialComponent } from './material/material.component';
import { ResultComponent } from './result/result.component';
import { SettingsComponent } from './settings/settings.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'result', component: ResultComponent },
    { path: 'fees', component: FeesComponent },
    { path: 'attendance', component: AttendanceComponent },
    { path: 'kit', component: KitComponent },
    { path: 'material', component: MaterialComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'students', component: StudentsComponent },
    { path: 'add-attendance', component: AddAttendanceComponent },
    { path: 'add-result', component: AddResultComponent },
    { path: 'details', component: DetailsComponent },
    { path: 'student/details', component: StudentDetailsComponent },
    { path: 'add-kit', component: AddKitDetailsComponent },
    { path: 'add-material', component: AddMaterialDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
