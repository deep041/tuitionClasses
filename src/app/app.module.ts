import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonSharedModule } from './common/common.module';
import { NewAdmissionComponent } from './new-admission/new-admission.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentComponent } from './new-admission/payment/payment.component';

const components = [AppComponent, NewAdmissionComponent, PaymentComponent];

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
        CommonSharedModule,
        NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
        BrowserAnimationsModule
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
