import { Component, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute } from "@angular/router";
import { CityService } from "./city.service";
import { ApiResult } from "../base.service";

import { City } from "./city";
@Component({
  selector: "app-cities",
  templateUrl: "./cities.component.html",
  styleUrls: ["./cities.component.css"],
})
export class CitiesComponent {
  public displayedColumns: string[] = [
    "id",
    "name",
    "lat",
    "lon",
    "countryName",
  ];
  public cities: MatTableDataSource<City>;
  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "name";
  public defaultSortOrder: string = "asc";
  defaultFilterColumn: string = "name";
  filterQuery: string = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private cityService: CityService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const column = "countryId";
    this.activatedRoute.queryParams.subscribe((queries) => {
      if (queries[column]) {
        this.defaultFilterColumn = column;
        this.filterQuery = queries[column];
      } else {
        this.defaultFilterColumn = "name";
        this.filterQuery = null;
      }

      this.loadData();
    });
  }

  loadData(query: string = null) {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    if (query) {
      this.filterQuery = query;
    }
    this.getData(pageEvent);
  }

  getData(event: PageEvent) {
    this.cityService
      .getData<ApiResult<City>>(
        event.pageIndex,
        event.pageSize,
        this.sort ? this.sort.active : this.defaultSortColumn,
        this.sort ? this.sort.direction : this.defaultSortOrder,
        this.filterQuery ? this.defaultFilterColumn : null,
        this.filterQuery ? this.filterQuery : null
      )
      .subscribe(
        (result) => {
          this.paginator.length = result.totalCount;
          this.paginator.pageIndex = result.pageIndex;
          this.paginator.pageSize = result.pageSize;
          this.cities = new MatTableDataSource<City>(result.data);
        },
        (error) => console.error(error)
      );
  }
}
