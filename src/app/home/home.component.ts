import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { from } from 'rxjs';
export interface DialogData {
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public myform: FormGroup;
  public stateList: any;
  public cityList: any;

  constructor(private readonly meta: MetaService, public fb: FormBuilder, public http: HttpClient, public dialog: MatDialog,
    public apiService: ApiService, public cookieService: CookieService) {
    window.scrollTo(0, 0)
    /**get temp token */
    this.apiService.gettemptoken().subscribe((data: any) => {

      if (data.status == "success") {
        this.cookieService.set('jwttoken', data.token);
      }
      // console.log(this.cookieService.get('jwttoken'));      
    })

    this.getStateList();
    this.getCityList();

    /**genarate myform */
    this.myform = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      saddress: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      homephone: ['', Validators.required],
      workphone: ['', Validators.required],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      electricityprovider: ['', Validators.required],
      utility: ['', Validators.required],
      homewoner:['',Validators.required],
      shade:['',Validators.required]
    })
  }

  ngOnInit() {

  }


  /**get state list form json */
  getStateList() {
    this.apiService.getJsonObject('assets/json/usa-states.json').subscribe(response => {
      let result: any = {};
      result = response;
      this.stateList = result;

    })
  }
  /**get city list form json */
  getCityList() {
    this.apiService.getJsonObject('assets/json/usa-cities.json').subscribe((res) => {
      let result: any = {};
      result = res;
      this.cityList = result;
    })
  }
  scroll() {
    /*window.scrollTo({
      top: 0,
      behavior: 'smooth',

    });*/
    document.querySelector('.top_formblock').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }


  openDialog() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',

    });

  }


  /**SUbmit function */
  doSubmit() {

    // console.log(this.myform.value);
    let x: any;
    for (x in this.myform.controls) {
      this.myform.controls[x].markAsTouched();
    }
    if (this.myform.valid) {

      /**form value insert */
      let data = { "source": "user", data: this.myform.value };
      this.apiService.CustomRequest(data, 'addorupdatedata').subscribe(res => {
        let result: any = {};
        result = res;
        console.log(result);
        if (result.status == 'success') {

          this.myform.reset();
          this.openSuccessDialog();
          setTimeout(() => {
            this.dialog.closeAll();
          }, 2000);

        }
      })
    }
  }

  /**blur function */
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
    //console.log('on blur .....');
  }

  //dialog function
  openSuccessDialog() {
    const dialogGenreRef = this.dialog.open(SuccessDialogComponent, {
      panelClass: ['modal-sm', 'infomodal'],
      disableClose: true,
    });
    dialogGenreRef.afterClosed().subscribe(result => {
      //console.log('SuccessDialogComponent was closed');
    });
  }
}

// success dialog component
@Component({
  selector: 'success-dialog',
  templateUrl: 'sucessdialog.component.html',
})
export class SuccessDialogComponent {

  constructor(public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  public onNoClick(): void {
    this.dialogRef.close();
  }

}