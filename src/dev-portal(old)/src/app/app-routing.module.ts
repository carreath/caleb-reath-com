import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './shared';

const routes: Routes = [
    { path: '', loadChildren: './pages/portfolio/portfolio.module#PortfolioModule' },
    { path: 'login', pathMatch: 'full', component: LoginComponent },
    { path: 'register', pathMatch: 'full', component: RegisterComponent },
    { path: 'account', loadChildren: './pages/account/account.module#AccountModule', canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
