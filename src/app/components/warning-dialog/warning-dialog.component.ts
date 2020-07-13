import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent implements OnInit {

  constructor(private dialog: MatDialogRef<WarningDialogComponent>) { }

  ngOnInit() {
  }

  closeDialog(answer: boolean) {
    this.dialog.close(answer);
  }
}
