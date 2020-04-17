import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private http:HttpClient) { }

  public signin(username:string, password:string){
    const headers = new HttpHeaders({Authorization: 'Basic ' +btoa(username+":"+password)})
    return this.http.put("http://127.0.0.1:8090/signin",{headers,responseType:'text' as 'json'});
  }

  public allclientes(){
    let username="dams"
    let password="1234567"
    const headers = new HttpHeaders({Authorization: 'Basic ' +btoa(username+":"+password)})
   return this.http.put("http://127.0.0.1:8090/api/auth/signin",{headers});
  }  
}
