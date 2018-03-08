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

@NgModule({
  imports: [
    CommonModule
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
        TestService
      ]
    };
  }
}
