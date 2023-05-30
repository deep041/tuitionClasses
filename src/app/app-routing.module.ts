import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NewAdmissionComponent } from './new-admission/new-admission.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule),
        pathMatch: 'full'
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
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'admission',
        component: NewAdmissionComponent
    }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
