import { PortfolioModule } from './pages/portfolio/portfolio.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { AccountModule } from './pages/account/account.module';
import { AccountRoutingModule } from './pages/account/account-routing.module';
import { CoreModule } from './core/core.module';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from './shared/shared.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        AppRoutingModule,
        AccountRoutingModule,
        HttpClientModule,
        AccountModule,
        CoreModule.forRoot(),
        SharedModule.forRoot(),
        PortfolioModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
