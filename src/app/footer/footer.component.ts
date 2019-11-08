import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



export interface DialogData {
  /* animal: string;
   name: string;*/
}


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public dialog: MatDialog) {  }


  openDialog(): void {

/*    window.scrollTo({
      top: 0,
      behavior: 'smooth',

    });*/

    setTimeout(()=>{
  
      window.scrollTo(0, 0)
    },200);

    const dialogRef = this.dialog.open(PrivacyModal, {
     // width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }



  ngOnInit() {
  }



}



@Component({
  selector: 'privacymodal',
  templateUrl: 'privacymodal.html',
})
export class PrivacyModal {

  constructor(
      public dialogRef: MatDialogRef<PrivacyModal>,
      /* @Inject(MAT_DIALOG_DATA) public data: DialogData*/) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}