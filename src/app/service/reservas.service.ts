import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { ReservaResponse } from 'src/app/models/ReservaResponse';

import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap, map } from 'rxjs/operators';
import { SortColumn, SortDirection } from './sortableReserva.directive';
import { URL_TO_LOGIN } from '../util/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';


interface SearchResult {
  reservaResponse: ReservaResponse[];
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


function sort(reservaResponse: ReservaResponse[], column: SortColumn, direction: string): ReservaResponse[] {
  if (direction === '' || column === '') {
    return reservaResponse;
  } else {
    return [...reservaResponse].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(reservaResponse: ReservaResponse, term: string, pipe: PipeTransform) {
  return reservaResponse.patente.toLowerCase().includes(term.toLowerCase())
    || reservaResponse.veichulo.toLowerCase().includes(term.toLowerCase())
    || reservaResponse.marca.toLowerCase().includes(term.toLowerCase())
    || reservaResponse.fechareserva.toLowerCase().includes(term.toLowerCase())
}

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _res$ = new BehaviorSubject<ReservaResponse[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 3,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };


  private getVeId = URL_TO_LOGIN.url + URL_TO_LOGIN.getReservaPorId;
  private body: any;
  userToken: string;
  private header: any;

  constructor(private pipe: DecimalPipe, private http: HttpClient) {
    
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._res$.next(result.reservaResponse);
      this._total$.next(result.total);
    });

    this._search$.next();


    //modo temp
    this.getReserva()
    .subscribe(res => {
      localStorage["datas2"] = JSON.stringify(res);
    });

   }

   
   getReserva() {
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get(`${this.getVeId + '/' + sessionStorage.getItem('idcliente') + '/cliente'}`, { headers: this.header });
  }



  get reservaResponses$() { return this._res$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {


    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;



    var stored_datas = JSON.parse(localStorage["datas2"]);
    // 1. sort
    let reservaResponse = sort(stored_datas, sortColumn, sortDirection);

    // 2. filter
    reservaResponse = reservaResponse.filter(reservaResponse => matches(reservaResponse, searchTerm, this.pipe));
    const total = reservaResponse.length;

    // 3. paginate
    reservaResponse = reservaResponse.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ reservaResponse, total });
  }
}
