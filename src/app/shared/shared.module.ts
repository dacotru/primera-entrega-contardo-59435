import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { UserFullNamePipe } from './pipes/user-full-name.pipe';
import { TitlesDirective } from './directives/titles.directive';



@NgModule({
  declarations: [
    UserFullNamePipe,
    TitlesDirective
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    UserFullNamePipe,
    TitlesDirective

  ]
})
export class SharedModule { }
