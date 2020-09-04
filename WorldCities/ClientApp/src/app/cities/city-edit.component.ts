import { Component, Inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
} from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { City } from "./city";
import { Country } from "../countries/country";

@Component({
  selector: "app-city-edit",
  templateUrl: "./city-edit.component.html",
  styleUrls: ["./city-edit.component.css"],
})
export class CityEditComponent {
  // the view title
  title: string;
  // the form model
  form: FormGroup;
  // the city object to edit
  city: City;

  // the city object id, as fetched from the active route:
  // It's NULL when we're adding a new city,
  // and not NULL when we're editing an existing one.
  id?: number;

  // the countries array for the select
  countries: Country[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  ngOnInit() {
    this.form = new FormGroup(
      {
        name: new FormControl("", Validators.required),
        lat: new FormControl("", Validators.required),
        lon: new FormControl("", Validators.required),
        countryId: new FormControl("", Validators.required),
      },
      null,
      this.isDupeCity()
    );
    this.loadData();
  }

  loadData() {
    // load countries
    this.loadCountries();

    // retrieve the ID from the 'id' parameter
    this.id = +this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      // EDIT MODE
      // fetch the city from the server
      const url = this.baseUrl + "api/cities/" + this.id;
      this.http.get<City>(url).subscribe(
        (result) => {
          this.city = result;
          this.title = "Edit - " + this.city.name;
          // update the form with the city value
          this.form.patchValue(this.city);
        },
        (error) => console.error(error)
      );
    } else {
      // ADD NEW MODE
      this.title = "Create a new City";
    }
  }

  loadCountries() {
    // fetch all the countries from the server
    const url = this.baseUrl + "api/countries";
    const params = new HttpParams()
      .set("pageSize", "9999")
      .set("sortColumn", "name")
      .set("sortOrder", "ASC");
    this.http
      .get<any>(url, { params })
      .subscribe(
        (result) => {
          this.countries = result.data;
        },
        (error) => console.error(error)
      );
  }

  onSubmit() {
    const city = this.id ? this.city : <City>{};
    city.name = this.form.get("name").value;
    city.lat = +this.form.get("lat").value;
    city.lon = +this.form.get("lon").value;
    city.countryId = +this.form.get("countryId").value;

    if (this.id) {
      // EDIT mode
      const url = this.baseUrl + "api/cities/" + this.city.id;
      this.http.put<City>(url, city).subscribe(
        (result) => {
          console.log("City " + city.id + " has been updated.");
          // go back to cities view
          this.router.navigate(["/cities"]);
        },
        (error) => console.log(error)
      );
    } else {
      // ADD NEW mode
      const url = this.baseUrl + "api/cities";
      this.http.post<City>(url, city).subscribe(
        (result) => {
          console.log("City " + result.id + " has been created.");
          // go back to cities view
          this.router.navigate(["/cities"]);
        },
        (error) => console.log(error)
      );
    }
  }

  isDupeCity(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      const city = <City>{};
      city.id = this.id ? this.id : 0;
      city.name = this.form.get("name").value;
      city.lat = +this.form.get("lat").value;
      city.lon = +this.form.get("lon").value;
      city.countryId = +this.form.get("countryId").value;

      const url = this.baseUrl + "api/cities/IsDupeCity";
      return this.http
        .post<boolean>(url, city)
        .pipe(map((result) => (result ? { isDupeCity: true } : null)));
    };
  }
}
