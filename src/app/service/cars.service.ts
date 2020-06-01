import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Cars} from 'src/app/models/cars';
import {CARS} from './cars';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from './sortable.directive';


interface SearchResult {
  cars: Cars[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(cars: Cars[], column: SortColumn, direction: string): Cars[] {
  if (direction === '' || column === '') {
    return cars;
  } else {
    return [...cars].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(cars: Cars, term: string, pipe: PipeTransform) {
  return cars.patente.toLowerCase().includes(term.toLowerCase())
    || cars.modelo.toLowerCase().includes(term.toLowerCase())
    || cars.marca.toLowerCase().includes(term.toLowerCase())
}

@Injectable({providedIn: 'root'})
export class CarService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _cars$ = new BehaviorSubject<Cars[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 2,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._cars$.next(result.cars);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get cars$() { return this._cars$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let cars = sort(CARS, sortColumn, sortDirection);

    // 2. filter
    cars = cars.filter(country => matches(country, searchTerm, this.pipe));
    const total = cars.length;

    // 3. paginate
    cars = cars.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({cars, total});
  }
}