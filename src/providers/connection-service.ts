import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Address } from '../app/app.domain';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConnectionService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConnectionService {

  constructor(public http: Http) {}

  getCep(cep: string): Observable<Address> {
    cep = cep.replace(/\D/g, '');
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`)
                    .map(response => response.json() as Address);
  }

}
