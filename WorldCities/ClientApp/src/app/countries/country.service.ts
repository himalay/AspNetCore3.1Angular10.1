import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { BaseService } from "../base.service";

@Injectable({
  providedIn: "root",
})
export class CountryService extends BaseService {
  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    super(http, baseUrl);
  }

  getData<T>(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
    filterColumn: string,
    filterQuery: string
  ): Observable<T> {
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
    return this.http.get<T>(url, { params });
  }

  get<T>(id): Observable<T> {
    const url = this.baseUrl + "api/Countries/" + id;
    return this.http.get<T>(url);
  }

  put<T>(item): Observable<T> {
    const url = this.baseUrl + "api/Countries/" + item.id;
    return this.http.put<T>(url, item);
  }

  post<T>(item): Observable<T> {
    const url = this.baseUrl + "api/countries/";
    return this.http.post<T>(url, item);
  }

  isDupeField(countryId, fieldName, fieldValue): Observable<boolean> {
    const params = new HttpParams()
      .set("countryId", countryId)
      .set("fieldName", fieldName)
      .set("fieldValue", fieldValue);
    const url = this.baseUrl + "api/Countries/IsDupeField";
    return this.http.post<boolean>(url, null, { params });
  }
}
