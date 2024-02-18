import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaestrosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
  ) { }

  public esquemaMaestro(){
    return {
      'id_trabajador':'',
      'nombre': '',
      'apellidos': '',
      'correo': '',
      'clave': '',
      'confirmar_clave': '',
      'fecha_nacimiento': '',
      'telefono': '',
      'rfc': '',
      'cubiculo': '',
      'area_investigacion':'',
      'lista' : '',
    }
  }

  public validarMaestro(data: any, editar: boolean){
    console.log("Validando maestro... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["id_trabajador"])){
      error["id_trabajador"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["nombre"])){
      error["nombre"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["apellidos"])){
      error["apellidos"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["correo"])){
      error["correo"] = this.errorService.required;
    }else if(!this.validatorService.max(data["correo"], 40)){
      error["correo"] = this.errorService.max(40);
    }else if (!this.validatorService.email(data['correo'])) {
      error['correo'] = this.errorService.email;
    }

    if(!editar){
      if(!this.validatorService.required(data["clave"])){
        error["clave"] = this.errorService.required;
      }

      if(!this.validatorService.required(data["confirmar_clave"])){
        error["confirmar_clave"] = this.errorService.required;
      }
    }

    if (!this.validatorService.required(data["fecha_nacimiento"]))
    {
      error["fecha_nacimiento"] = this.errorService.required;  
    }

    if (!this.validatorService.required(data["curp"]))
    {
      error["curp"] = this.errorService.required;  
    }
    else if(!this.validatorService.max(data["curp"],18))
    {
      error["curp"] = this.errorService.max(18);
      alert("La CURP debe tener 18 caracteres");
    }
    else if(!this.validatorService.min(data["curp"],18))
    {
      error["curp"] = this.errorService.min(18);
      alert("La CURP debe tener 18 caracteres");
    }
    
    if(!this.validatorService.required(data["rfc"])){
      error["rfc"] = this.errorService.required;
    }else if(!this.validatorService.min(data["rfc"], 12)){
      error["rfc"] = this.errorService.min(12);
      alert("La longitud de caracteres deL RFC es menor, deben ser 12");
    }else if(!this.validatorService.max(data["rfc"], 13)){
      error["rfc"] = this.errorService.max(13);
      alert("La longitud de caracteres deL RFC es mayor, deben ser 13");
    }

    if(!this.validatorService.required(data["edad"])){
      error["edad"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["edad"])){
      alert("El formato es solo números");
    }

    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["cubiculo"])){
      error["cubiculo"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["area_investigacion"]))
    {
      error["area_investigacion"] = this.errorService.required;  
    }
    return error;
  }

}
