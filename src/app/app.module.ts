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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BsModalRef, BsModalService, ModalModule} from 'ngx-bootstrap';
import { LoginComponent } from './modals/login/login.component';
import { LogoutComponent } from './modals/logout/logout.component';
import {UserService} from './@core/services/user.service';

import {PersonalInfoComponent} from './modals/personal-info/personal-info.component';
import {InputFileConfig} from 'ngx-input-file/src/lib/interfaces/input-file-config';
import {InputFileModule} from 'ngx-input-file';
import {FormsModule} from '@angular/forms';

const config: InputFileConfig = {
  sizeLimit: 100,
  fileLimit: 1,
  fileAccept: 'image/*',
};

@NgModule({
  declarations: [AppComponent, LoginComponent, LogoutComponent, PersonalInfoComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ModalModule.forRoot(),
    InputFileModule.forRoot(config),
  ],
  bootstrap: [AppComponent],
  providers: [BsModalService, BsModalRef,
    {provide: APP_BASE_HREF, useValue: '/'},
    UserService,
  ],
  entryComponents: [LoginComponent, PersonalInfoComponent, LogoutComponent],
})
export class AppModule {
}
