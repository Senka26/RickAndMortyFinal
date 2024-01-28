import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { CharacterListComponent } from './header/character-list/character-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CharacterInfoComponent } from './header/character-list/character-info/character-info.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { EditCharacterComponent } from './favourites/edit-character/edit-character.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    CharacterListComponent,
    CharacterInfoComponent,
    FavouritesComponent,
    EditCharacterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  // radi i bez ovoga, mozda obr:
  exports: [
    MaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
