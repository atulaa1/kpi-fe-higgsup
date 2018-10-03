import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccManagementsComponent} from './acc-managements.component';
import {AccManagementComponent} from './acc-management/acc-management.component';
import {FormsModule} from '@angular/forms';
import {AskSaveComponent} from './acc-management/ask-save/ask-save.component';
import {RouterModule} from '@angular/router';
import {AccManagementLateComponent} from './acc-management-late/acc-management-late.component';
import {NormalCharacterOnlyDirective} from '../../@core/directives/normal-character-only.directive';
import {AccInfoComponent} from './acc-management/acc-info/acc-info.component';
import {ThemeModule} from '../../@theme/theme.module';
import { NoticeBoxComponent } from './acc-management-late/notice-box/notice-box.component';
import {PositiveNumberOnlyDirective} from '../../@core/directives/positive-number-only.directive';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [AccManagementsComponent, AccManagementComponent, AskSaveComponent,
    AccManagementLateComponent, NormalCharacterOnlyDirective, AccInfoComponent, NoticeBoxComponent, PositiveNumberOnlyDirective],
  entryComponents: [AccManagementsComponent],
})
export class AccManagementsModule {
}
