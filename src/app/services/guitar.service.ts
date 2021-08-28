import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GuitarService {
  constructor(private httpClient: HttpClient) {}

  getGuitars() {
    return this.httpClient.get('http://127.0.0.1:8000/api/guitars');
  }

  addGuitar(data) {
    return this.httpClient.post('http://127.0.0.1:8000/api/addGuitar', data);
  }
  removeGuitar(id) {
    return this.httpClient.delete(
      `http://127.0.0.1:8000/api/deleteGuitar/${id}`
    );
  }
  getGuitarById(id) {
    return this.httpClient.get(`http://127.0.0.1:8000/api/guitars/${id}`);
  }

  updateGuitar(id, data) {
    return this.httpClient.put(
      `http://127.0.0.1:8000/api/updateGuitar/${id}`,
      data
    );
  }
  searchGuitars(q) {
    return this.httpClient.get(`http://127.0.0.1:8000/api/search/${q}`);
  }
}
