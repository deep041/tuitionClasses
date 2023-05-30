import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarterRoutingModule } from './starter-routing.module';
import { StarterComponent } from './starter.component';
import { RouterModule } from '@angular/router';
import { CommonSharedModule } from '../common/common.module';


@NgModule({
    declarations: [StarterComponent],
    imports: [
        CommonModule,
        StarterRoutingModule,
        RouterModule,
        CommonSharedModule
    ]
})
export class StarterModule { }
