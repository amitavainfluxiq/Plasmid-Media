import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpHeaders, HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public myform: FormGroup;

  constructor(private readonly meta: MetaService, public fb: FormBuilder, public http: HttpClient, ) {window.scrollTo(0, 0)


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

    })
  }




  ngOnInit() {
  }
  inputUntouch(form: any, val: any) {

    form.controls[val].markAsUntouched();
    console.log('on blur .....');
  }


  scroll(){
    /*window.scrollTo({
      top: 0,
      behavior: 'smooth',

    });*/
    document.querySelector('.top_formblock').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }


  openDialog(){
    window.scrollTo({
     top: 0,
     behavior: 'smooth',

     });

  }



  doSubmit(){
    console.log(this.myform.value);
    let x: any;
    for (x in this.myform.controls) {
      this.myform.controls[x].markAsTouched();
    }
    if (this.myform.valid) {
    /*  let link = 'http://166.62.39.137:5001/salesvertcontactusdetails';*/
      let link = '';
      let data = {data: this.myform.value};
      this.http.post(link, data)
          .subscribe(res => {

            let result: any = {};
            result = res;
            console.log(result);
            if (result.status == 'success') {

              this.myform.reset();

              setTimeout(()=>{

              },2000);

            }
          })
    }
  }



}


