import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeModule} from '../../@theme/theme.module';
import {PointForUsersComponent} from './point-for-users.component';
import {UsualPointComponent} from './usual-point/usual-point.component';
import {FamePointComponent} from './fame-point/fame-point.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [PointForUsersComponent, UsualPointComponent, FamePointComponent],
})
export class PointForUsersModule { }
