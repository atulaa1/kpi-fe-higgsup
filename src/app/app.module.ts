/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {APP_BASE_HREF, registerLocaleData} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, LOCALE_ID} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import localeVi from '@angular/common/locales/vi';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ThemeModule} from './@theme/theme.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BsDatepickerModule, BsModalRef, BsModalService, ModalModule, TooltipModule} from 'ngx-bootstrap';
import {LoginComponent} from './modals/login/login.component';
import {LogoutComponent} from './modals/logout/logout.component';
import {UserService} from './@core/services/user.service';

import {PersonalInfoComponent} from './modals/personal-info/personal-info.component';
import {InputFileConfig} from 'ngx-input-file/src/lib/interfaces/input-file-config';
import {InputFileModule} from 'ngx-input-file';
import {FormsModule} from '@angular/forms';
import {DataService} from './@core/services/data.service';
import {AccManagementsModule} from './pages/acc-managements/acc-managements.module';
import {PhoneNumberOnlyDirective} from './@core/directives/number.directive';
import {DataTransferService} from './@core/services/dataTransfer.service';
import {NgHttpLoaderModule} from 'ng-http-loader';

const config: InputFileConfig = {
  sizeLimit: 100,
  fileLimit: 1,
  fileAccept: 'image/*',
};

@NgModule({
  declarations: [AppComponent, LoginComponent, LogoutComponent, PersonalInfoComponent, PhoneNumberOnlyDirective],
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
    BsDatepickerModule.forRoot(),
    InputFileModule.forRoot(config),
    TooltipModule.forRoot(),
    AccManagementsModule,
    NgHttpLoaderModule,
  ],
  bootstrap: [AppComponent],
  providers: [BsModalService, BsModalRef,
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: LOCALE_ID, useValue: 'vi'},
    UserService,
    DataService,
    DataTransferService,
  ],
  entryComponents: [LoginComponent, PersonalInfoComponent, LogoutComponent],
})
export class AppModule {

  constructor() {
    registerLocaleData(localeVi, 'vi');
  }
}
