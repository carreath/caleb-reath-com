import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioComponent } from './portfolio.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    AboutMeComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactMeComponent,
    PortfolioComponent
  ]
})
export class PortfolioModule { }
