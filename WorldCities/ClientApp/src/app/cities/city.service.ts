import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { BaseService, ApiResult } from "../base.service";
import { City } from "./city";

@Injectable({
  providedIn: "root",
})
export class CityService extends BaseService {
  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    super(http, baseUrl);
  }

  getData<ApiResult>(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
    filterColumn: string,
    filterQuery: string
  ): Observable<ApiResult> {
    const url = this.baseUrl + "api/Cities";
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("sortColumn", sortColumn)
      .set("sortOrder", sortOrder);
    if (filterQuery) {
      params = params
        .set("filterColumn", filterColumn)
        .set("filterQuery", filterQuery);
    }
    return this.http.get<ApiResult>(url, { params });
  }

  get<City>(id): Observable<City> {
    const url = this.baseUrl + "api/Cities/" + id;
    return this.http.get<City>(url);
  }

  put<City>(item): Observable<City> {
    const url = this.baseUrl + "api/Cities/" + item.id;
    return this.http.put<City>(url, item);
  }

  post<City>(item): Observable<City> {
    const url = this.baseUrl + "api/Cities/";
    return this.http.post<City>(url, item);
  }

  getCountries<ApiResult>(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
    filterColumn: string,
    filterQuery: string
  ): Observable<ApiResult> {
    const url = this.baseUrl + "api/Countries";
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("sortColumn", sortColumn)
      .set("sortOrder", sortOrder);
    if (filterQuery) {
      params = params
        .set("filterColumn", filterColumn)
        .set("filterQuery", filterQuery);
    }
    return this.http.get<ApiResult>(url, { params });
  }

  isDupeCity(item): Observable<boolean> {
    const url = this.baseUrl + "api/Cities/IsDupeCity";
    return this.http.post<boolean>(url, item);
  }
}
