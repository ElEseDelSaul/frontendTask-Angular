import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { taskInterface } from './models/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tasks: taskInterface[] = [];
  task: taskInterface = {
    id: null as any,
    nombre: '',
    status: false
  }

  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.appService.getAll()
      .subscribe((data: any) => {
        this.tasks = data,
          console.table(data);
      })
  }

  save() { //Add or Edit Task

    console.log("Entrada: ", this.task);
    if (this.task.id) { //Edit Task
      this.appService.update(this.task.id!, this.task)
        .subscribe(() => this.getTasks() )
    } else {  //Add new Task
      this.appService.create(this.task)
        .subscribe(() => this.getTasks() ) //Volver a cargar tareas
    }
    console.log("SALIDA: ", this.task);

    this.task = { //Limpiar Form
      id: null,
      nombre: '',
      status: false
    }
  }


  edit(task: taskInterface) {
    this.task = { //romper con el two-way binding
      ...task
    };
  }

  
  delete(task:taskInterface){
    let r = confirm(`Are you sure to delete task "${task.nombre}" ?`);
    if(r){
      //console.log(task);
       this.appService.delete(task.id!)
        .subscribe( () =>{
          this.getTasks();
        } ) 
    }
  }
  
}



