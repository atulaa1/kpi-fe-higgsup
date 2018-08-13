import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActiManagementComponent} from './acti-management.component';
import { CreateActiComponent } from './create-acti/create-acti.component';
import { ConfirmActiComponent } from './confirm-acti/confirm-acti.component';
import {ActiManagementRoutingModule} from './acti-management-routing.module';
import {ThemeModule} from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    ActiManagementRoutingModule,
    ThemeModule,
  ],
  declarations: [ActiManagementComponent, CreateActiComponent, ConfirmActiComponent],
})
export class ActiManagementModule { }
