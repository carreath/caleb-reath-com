import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleWithProviders } from '@angular/compiler/src/core';

import {
  HeaderComponent,
  FooterComponent
} from './layout/index';

import {
  UserService,
  AlertService,
  AuthenticationService,
  TestService
} from './services/index';
import { WINDOW_PROVIDERS } from './services/window.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        UserService,
        AlertService,
        AuthenticationService,
        TestService,
        WINDOW_PROVIDERS
      ]
    };
  }
}
