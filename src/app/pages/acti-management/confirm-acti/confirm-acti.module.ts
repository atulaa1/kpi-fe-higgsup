import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClubComponent} from './club/club.component';
import {LoginComponent} from '../../../modals/login/login.component';
import {PersonalInfoComponent} from '../../../modals/personal-info/personal-info.component';
import {LogoutComponent} from '../../../modals/logout/logout.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ClubComponent],
  entryComponents: [ClubComponent],
})
export class ConfirmActiModule { }
