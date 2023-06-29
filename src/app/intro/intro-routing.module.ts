import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquiryComponent } from './inquiry/inquiry.component';
import { IntroComponent } from './intro.component';

const routes: Routes = [
    { path: '', component: IntroComponent },
    { path: 'inquiry', component: InquiryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntroRoutingModule { }
