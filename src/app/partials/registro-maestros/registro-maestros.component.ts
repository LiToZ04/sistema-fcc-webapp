import { Router } from '@angular/router';
import { MaestrosService } from './../../services/maestros.service';
import { Component, Input, OnInit } from '@angular/core';
//Para poder usar jquery definir esto
declare var $:any;
@Component({
  selector: 'app-registro-maestros',
  templateUrl: './registro-maestros.component.html',
  styleUrls: ['./registro-maestros.component.scss']
})
export class RegistroMaestrosComponent implements OnInit{
  @Input() rol: string = "";

  public errors:any = {};
  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public maestro:any = {};
  public editar:boolean = false;

  //Array para materias - checkbox
  public materias:any[]= [
    {value: '1', nombre: 'Aplicaciones Web'},
    {value: '2', nombre: 'Programación 1'},
    {value: '3', nombre: 'Bases de datos'},
    {value: '4', nombre: 'Tecnologías Web'},
    {value: '5', nombre: 'Minería de datos'},
    {value: '6', nombre: 'Desarrollo móvil'},
    {value: '7', nombre: 'Estructuras de datos'},
    {value: '8', nombre: 'Administración de redes'},
    {value: '9', nombre: 'Ingeniería de Software'},
    {value: '10', nombre: 'Administración de S.O.'},
  ];

  constructor(
    private maestrosService: MaestrosService,
    private router: Router
  ){}

  ngOnInit(): void {
    //Definir el esquema a mi JSON
    this.maestro = this.maestrosService.esquemaMaestro();
    this.maestro.rol = this.rol;
    console.log("Maestro: ", this.maestro);

  }

  public regresar(){

  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.maestrosService.validarMaestro(this.maestro, this.editar)
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    // Validamos que las contraseñas coincidan
    //Validar la contraseña
    if(this.maestro.password == this.maestro.confirmar_password){
      //Aquí si todo es correcto vamos a registrar - aquí se manda a consumir el servicio
      this.maestrosService.registrarMaestro(this.maestro).subscribe(
        (response)=>{
          alert("Usuario registrado correctamente");
          console.log("Usuario registrado: ", response);
          this.router.navigate(["/"]);
        }, (error)=>{
          alert("No se pudo registrar usuario");
        }
      );
    }else{
      alert("Las contraseñas no coinciden");
      this.maestro.password="";
      this.maestro.confirmar_password="";
    }
  }

  public actualizar(){

  }

  //Funciones para password
  showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  //Función para detectar el cambio de fecha
  //Para la fecha
  public changeFecha(event :any){
    console.log(event);
    console.log(event.value.toISOString());
    
    this.maestro.nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.maestro.nacimiento);
  }

  public checkboxChange(event:any){
    //console.log("Evento: ", event);
    if(event.checked){
      this.maestro.materias_json.push(event.source.value)
    }else{
      console.log(event.source.value);
      this.maestro.materias_json.forEach((materia: any, i: any) => {
        if(materia == event.source.value){
          this.maestro.materias_json.splice(i,1)
        }
      });
    }
    console.log("Array materias: ", this.maestro);
  }
}