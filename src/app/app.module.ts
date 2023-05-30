import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonSharedModule } from './common/common.module';
import { NewAdmissionComponent } from './new-admission/new-admission.component';

const components = [AppComponent, NewAdmissionComponent];

@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        BrowserModule, 
        IonicModule.forRoot({ animated: false }), 
        AppRoutingModule, 
        FormsModule, 
        ReactiveFormsModule,
        CommonSharedModule
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
