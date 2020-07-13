import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  @Input() subject = '';

  constructor(private dialog: MatDialogRef<DeleteDialogComponent>) { }

  ngOnInit() {
  }

  closeDialog(answer: boolean) {
    this.dialog.close(answer);
  }
}
