import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';
import { Alumnos } from '../models';

interface UserDialogData {
  editingUser?: Alumnos;
}

@Component({
  selector: 'app-alumnos-dialog',
  templateUrl: './alumnos-dialog.component.html',
  styles: ``,
})
export class AlumnosDialogComponent {
  userForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<AlumnosDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: UserDialogData
  ) {
    this.userForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]*$/)]],
      lastName: [null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]*$/)]],
      email: [null, [Validators.required, Validators.email]], // La validación de email ya incluye un formato válido
    });
    this.patchFormValue();
  }

  private get isEditing() {
    return !!this.data?.editingUser;
  }

  patchFormValue() {
    if (this.data?.editingUser) {
      this.userForm.patchValue(this.data.editingUser);
    }
  }

  onSave(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.userForm.value,
        id: this.isEditing
          ? this.data!.editingUser!.id
          : generateRandomString(4),
        createdAt: this.isEditing
          ? this.data!.editingUser!.createdAt
          : new Date(),
      });
    }
  }
}