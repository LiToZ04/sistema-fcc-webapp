import { Component, Input, OnInit } from '@angular/core';
import { MaestrosService } from 'src/app/services/maestros.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-registro-maestros',
  templateUrl: './registro-maestros.component.html',
  styleUrls: ['./registro-maestros.component.scss']
})
export class RegistroMaestrosComponent {
  @Input() rol: string = "";

  public maestro:any ={};
  public editar:boolean =false;
  public errors:any = {};
  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  areasInvestigacion = ['Desarrollo Web', 'Programacion', 'Base de Datos', 'Redes', 'Matematicas'];

  constructor(
    private maestroServices: MaestrosService,
    private router: Router,
  ){}

  ngOnInit(): void {
    //Definir el esquema a mi JSON
    this.maestro = this.maestroServices.esquemaMaestro();
    this.maestro.rol = this.rol;
    console.log("Maestro: ", this.maestro);

  }

  public registrar(){
    this.errors = [];

    this.errors = this.maestroServices.validarMaestro(this.maestro, this.editar)
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
  }

  public actualizar(){

  }
  public regresar(){
    this.router.navigate([""]);
  }

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

  listaItems = [
    { nombre: 'Aplicaciones Web', checked: false },
    { nombre: 'POO I', checked: false },
    { nombre: 'POO II', checked: false },
    { nombre: 'Base de datos', checked: false },
    { nombre: 'Mineria de Datos', checked: false },
    { nombre: 'Desarollo Movil', checked: false },
    { nombre: 'Estructura de datos', checked: false },
    { nombre: 'Administracion de redes', checked: false },
    { nombre: 'Ingenieria de Software I', checked: false },
    { nombre: 'Ingenieria de Software II', checked: false },
    { nombre: 'Administracion de S.0', checked: false },
  ];
}
