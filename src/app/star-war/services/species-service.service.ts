import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { parseSpeciesList, parseSpecie } from '../helpers';
import { List, Specie, RawList, RawSpecie, SearchData } from '../models';

const url = 'https://swapi.dev/api/species';

@Injectable({
  providedIn: 'root'
})
export class SpeciesServiceService {

  constructor(private readonly http: HttpClient) { }
  getAll(searchData?: SearchData): Observable<List<Specie>> {
    console.debug('sxx')
    return this.http
      .get<RawList<RawSpecie>>(url, { params: searchData })
      .pipe(map((obj) => parseSpeciesList(obj)));
  }

  get(id: string): Observable<Specie> {
    return this.http
      .get<RawSpecie>(`${url}/${id}`)
      .pipe(map((obj) => parseSpecie(obj)))
  }
}
