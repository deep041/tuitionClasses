import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/services/guard/auth.guard';
import { NewAdmissionComponent } from './new-admission/new-admission.component';
import { PaymentComponent } from './new-admission/payment/payment.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'starter',
        loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
    },
    {
        path: 'intro',
        loadChildren: () => import('./intro/intro.module').then(m => m.IntroModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'admission',
        component: NewAdmissionComponent
    }, 
    {
        path: 'admission/payment',
        component: PaymentComponent
    }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
