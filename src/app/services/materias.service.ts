import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { environment } from 'src/assets/environments/environment';
import { Observable } from 'rxjs';
import { FacadeService } from './facade.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) {}

  public esquemaMateria() {
    return {
      'nrc': '',
      'nombre_materia': '',
      'seccion': '',
      'dias_json': [],
      'hora_inicial': '',
      'hora_final': '',
      'salon': '',
      'programa_educativo': ''
    };
  }

  // Validación para el formulario
  public validarMateria(data: any, editar: boolean) {
    console.log("Validando materia... ", data);
    let error: any = [];

    if (!this.validatorService.required(data["nrc"])) {
      error["nrc"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["seccion"])) {
      error["seccion"] = this.errorService.required;
    }

    if (data["dias_json"].length === 0) {
      error["dias_json"] = "Al menos debes elegir un dia, flojo";
    }


    if (!this.validatorService.required(data["hora_inicial"])) {
      error["hora_inicial"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["hora_final"])) {
      error["hora_final"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["salon"])) {
      error["salon"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["programa_educativo"])) {
      error["programa_educativo"] = this.errorService.required;
    }

    // Return arreglo
    return error;
  }

  public registrarMateria(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/materias/`, data, httpOptions);
  }

  public obtenerListaMaterias(): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-materias/`, {headers:headers});
  }

  // Obtener un solo maestro dependiendo su ID
  public getMateriaByID(idMateria: Number) {
    return this.http.get<any>(`${environment.url_api}/materias/?id=${idMateria}`, httpOptions);
  }

  // Servicio para actualizar un usuario
  public editarMateria(data: any): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.put<any>(`${environment.url_api}/materias-edit/`, data, { headers: headers });
  }

  // Eliminar Maestro
  public eliminarMateria(idMateria: number): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.delete<any>(`${environment.url_api}/materias-edit/?id=${idMateria}`, { headers: headers });
  }
}