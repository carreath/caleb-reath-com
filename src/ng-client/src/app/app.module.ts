import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortfolioPageComponent } from './pages/portfolio-page/portfolio-page.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { HeaderComponent } from './components/header/header.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { SkillsListComponent } from './components/skills-list/skills-list.component';
import { ToolsListComponent } from './components/tools-list/tools-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxPageScrollModule } from 'ngx-page-scroll';

@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    ContactFormComponent,
    HeaderComponent,
    ProjectsListComponent,
    SkillsListComponent,
    ToolsListComponent,
    PortfolioPageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    NgxPageScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
