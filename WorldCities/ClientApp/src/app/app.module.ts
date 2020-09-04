import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CitiesComponent } from "./cities/cities.component";
import { CityEditComponent } from "./cities/city-edit.component";
import { CountriesComponent } from "./countries/countries.component";
import { CountryEditComponent } from "./countries/country-edit.component";
import { AngularMaterialModule } from "./angular-material.module";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CitiesComponent,
    CityEditComponent,
    CountriesComponent,
    CountryEditComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "cities", component: CitiesComponent, pathMatch: "full" },
      { path: "cities/:id", component: CityEditComponent },
      { path: "city", component: CityEditComponent, pathMatch: "full" },
      { path: "countries", component: CountriesComponent, pathMatch: "full" },
      { path: "countries/:id", component: CountryEditComponent },
      { path: "country", component: CountryEditComponent },
    ]),
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
