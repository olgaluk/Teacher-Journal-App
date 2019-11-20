import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root/app.component';

import { NavComponent } from './components/panel/nav.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './common/http-interceptors/index';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { appReducers } from './redux/store/reducers/app.reducers';
import { environment } from '../environments/environment';
import { StudentEffects } from './redux/store/effects/student.effects';
import { SubjectEffects } from './redux/store/effects/subject.effects';
import { StudentsTableService } from './common/services/students/students-table.service';
import { SubjectsTableService } from './common/services/subjects/subjects-table.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([StudentEffects, SubjectEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    httpInterceptorProviders,
    StudentsTableService,
    SubjectsTableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
