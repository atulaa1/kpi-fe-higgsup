/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ThemeModule} from './@theme/theme.module';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BsModalRef, BsModalService, ModalModule} from 'ngx-bootstrap';
import { LoginComponent } from './modals/login/login.component';
import { LogoutComponent } from './modals/logout/logout.component';

import {PersonalInfoComponent} from './modals/personal-info/personal-info.component';
@NgModule({
  declarations: [AppComponent, LoginComponent, LogoutComponent, PersonalInfoComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ModalModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [BsModalService, BsModalRef, NgbActiveModal,
    {provide: APP_BASE_HREF, useValue: '/'},
  ],
  entryComponents: [LoginComponent, PersonalInfoComponent, LogoutComponent],
})
export class AppModule {
}
