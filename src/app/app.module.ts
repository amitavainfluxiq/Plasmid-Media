import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MetaModule } from '@ngx-meta/core';


import { HomeComponent,SuccessDialogComponent } from './home/home.component';


import {DemoMaterialModule} from '../app/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';


import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { FooterComponent, PrivacyModal } from './footer/footer.component';

import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,

    HeaderComponent,

    FooterComponent,

    PrivacyModal,

    SuccessDialogComponent
  ],
  imports: [


    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,MetaModule.forRoot(), BrowserAnimationsModule
  ],

  entryComponents: [PrivacyModal,SuccessDialogComponent],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }



