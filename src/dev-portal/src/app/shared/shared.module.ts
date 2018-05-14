import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleWithProviders } from '@angular/compiler/src/core';

import {
  User,
  AlertComponent,
  JwtInterceptor,
  FakeBackendInterceptor,
  AuthGuard
} from './index';

const components = [
  AlertComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        JwtInterceptor,
        FakeBackendInterceptor,
        AuthGuard
      ]
    };
  }
}
