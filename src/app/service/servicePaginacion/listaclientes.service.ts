import { SortColumn, SortDirection } from '../sortable.directive';
import { Clienteslist } from 'src/app/models/clienteslist';
import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { Cars } from 'src/app/models/cars';
// import { CARS } from './cars';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap, map } from 'rxjs/operators';
import { URL_TO_LOGIN } from '../../util/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';






  interface SearchResult {
    clientelist: Clienteslist[]
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

  function sort(clientelist: Clienteslist[], column: SortColumn, direction: string): Clienteslist[] {
    if (direction === '' || column === '') {
      return clientelist;
    } else {
      return [...clientelist].sort((a, b) => {
        const res = compare(`${a[column]}`, `${b[column]}`);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  function matches(clientelist: Clienteslist, term: string, pipe: PipeTransform) {
    return clientelist.rut.toLowerCase().includes(term.toLowerCase())
      || clientelist.nombre.toLowerCase().includes(term.toLowerCase())
      || clientelist.apellido.toLowerCase().includes(term.toLowerCase())
      || clientelist.telefono.toLowerCase().includes(term.toLowerCase())
  }

  @Injectable({
    providedIn: 'root'
  })
  export class ListaclientesService {
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _clientelist$ = new BehaviorSubject<Clienteslist[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    private _state: State = {
      page: 1,
      pageSize: 4,
      searchTerm: '',
      sortColumn: '',
      sortDirection: ''
    };


    private getCliente = URL_TO_LOGIN.url + URL_TO_LOGIN.getClientesPag;
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
        this._clientelist$.next(result.clientelist);
        this._total$.next(result.total);
      });

      this._search$.next();


      //modo temp
      this.getClientes()
      .subscribe(res => {
        localStorage["datas"] = JSON.stringify(res);
      });

    }


    getClientes(): Observable<Clienteslist[]>{
      this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
      return this.http.get<Clienteslist[]>(`${this.getCliente}`, { headers: this.header });
   }



    get clientelist$() { return this._clientelist$.asObservable(); }
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



      var stored_datas = JSON.parse(localStorage["datas"]);
      // 1. sort
      let clientelist = sort(stored_datas, sortColumn, sortDirection);

      // 2. filter
      clientelist = clientelist.filter(clientelist => matches(clientelist, searchTerm, this.pipe));
      const total = clientelist.length;

      // 3. paginate
      clientelist = clientelist.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      return of({ clientelist, total });
    }
}
