import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent } from './widgets/text/text.component';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './widgets/select/select.component';
import { ModuleHeaderComponent } from './components/module-header/module-header.component';
import { ButtonComponent } from './widgets/button/button.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './interceptor/header-interceptor.interceptor';
import { TextareaComponent } from './widgets/textarea/textarea.component';
import { ToasterComponent } from './widgets/toaster/toaster.component';

const components = [
    TextComponent,
    SelectComponent,
    ModuleHeaderComponent,
    ButtonComponent,
    TextareaComponent,
    ToasterComponent
]

@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule
    ],
    exports: [
        ...components
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true
        }
    ]
})

export class CommonSharedModule { }
