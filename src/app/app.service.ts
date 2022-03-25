import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Interface
import { taskInterface } from './models/task';

const URI = 'http://localhost:8080/tareas';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor( private http: HttpClient ) { }

  getAll(){
    return this.http.get(URI);
  }

  create(task: taskInterface ) {
    return this.http.post(URI, task);
  }

  update(id: String , task: taskInterface){
    return this.http.put(`${URI}/${id}`, task);
  }

  delete(id: String){
    return this.http.delete(`${URI}/${id}`);
  }

}
