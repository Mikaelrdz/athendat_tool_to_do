import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';


interface DialogData {
  id: string;
  name: string;
}


@Component({
  selector: 'app-delete-dialog',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  confirmDelete(): void {
    this.dialogRef.close('confirm');
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
