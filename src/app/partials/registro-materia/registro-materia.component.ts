import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MateriasService } from 'src/app/services/materias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';

// AGREGAMOS PARA EL TIMEPICKER
import { ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

declare var $: any;

@Component({
  selector: 'app-registro-materia',
  templateUrl: './registro-materia.component.html',
  styleUrls: ['./registro-materia.component.scss']
})
export class RegistroMateriaComponent implements OnInit {
  // AGREGAMOS PARA EL TIMEPICKER
  public horaInicial = new FormControl();
  public horaFinal = new FormControl();

  @ViewChild('pickerInicial') pickerInicial: NgxMaterialTimepickerModule;
  @ViewChild('pickerFinal') pickerFinal: NgxMaterialTimepickerModule;

  public horaSeleccionada = new FormControl();
  @ViewChild('picker') picker: NgxMaterialTimepickerModule;
  public onHoraSeleccionadaChange(event: any): void {
    console.log('Hora seleccionada:', this.horaSeleccionada.value);
  }


  @Input() datos_materia: any = {};

  public materia: any = {};

  public token: string = "";
  public errors: any = {};
  public editar: boolean = false;
  public idMateria: Number = 0;
  // Check
  public valoresCheckbox: any = [];
  public dias_json: any[] = [];

  // Para el select
  public programas: any[] = [
    { value: '1', viewValue: 'Ingenieria en Ciencias de la Computacion' },
    { value: '2', viewValue: 'Licenciatura en Ciencias de la Computacion' },
    { value: '3', viewValue: 'Ingenieria en Tecnologias de la Información' },
  ];

  public dias: any[] = [
    { value: '1', nombre: 'Lunes' },
    { value: '2', nombre: 'Martes' },
    { value: '3', nombre: 'Miercoles' },
    { value: '4', nombre: 'Jueves' },
    { value: '5', nombre: 'Viernes' },
    { value: '6', nombre: 'Sabado' },
  ];

  constructor(
    private location: Location,
    private materiasService: MateriasService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService
  ) { }

  ngOnInit() {
    this.materia = this.materiasService.esquemaMateria();
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idMateria = this.activatedRoute.snapshot.params['id'];
      console.log("ID Materia: ", this.idMateria);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerMateriaByID();
    }
  }

  public regresar() {
    this.location.back();
  }

  // Función para detectar el cambio de fecha
  public changeFecha(event: any) { }

  public registrar() {
    this.errors = [];


    this.errors = this.materiasService.validarMateria(this.materia, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    else {
      // Aquí si todo es correcto vamos a registrar - aquí se manda a llamar al servicio
      this.materiasService.registrarMateria(this.materia).subscribe(
        (response) => {
          alert("Materia registrada correctamente");
          console.log("Materia registrado: ", response);
          if (this.token != "") {
            this.router.navigate(["home"]);
          } else {
            this.router.navigate(["home"]);
          }
        },
        (error) => {
          alert("No se pudo registrar la materia: " + error.error.message);
          console.error("Error al registrar la materia: ", error);
        }
      )
    }
  }

  public actualizar() {
    // Validación
    this.errors = [];


    this.errors = this.materiasService.validarMateria(this.materia, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    console.log("Pasó la validación");

    this.materiasService.editarMateria(this.materia).subscribe(
      (response) => {
        alert("Materia editada correctamente");
        console.log("Materia editada: ", response);
        // Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      },
      (error) => {
        alert("No se pudo editar la materia");
      }
    );
  }

  public checkboxChange(event: any) {
    if (event.checked) {
      this.materia.dias_json.push(event.source.value);
    } else {
      console.log(event.source.value);
      this.materia.dias_json.forEach((dia, i) => {
        if (dia == event.source.value) {
          this.materia.dias_json.splice(i, 1)
        }
      });
    }
    console.log("Array Materia: ", this.materia);
  }

  public revisarSeleccion(nombre: string) {
    if (this.materia.dias_json) {
      var busqueda = this.materia.dias_json.find((element) => element == nombre);
      if (busqueda !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public obtenerMateriaByID() {
    this.materiasService.getMateriaByID(this.idMateria).subscribe(
      (response) => {
        this.materia = response;
        this.materia.hora_inicial = this.materia.hora_inicial.substring(0, 4);
        this.materia.hora_final = this.materia.hora_final.substring(0, 4);

        this.horaInicial.setValue(this.materia.hora_inicial);
        this.horaFinal.setValue(this.materia.hora_final);

        console.log("Datos materia: ", this.materia);
      }, (error) => {
        alert("No se pudieron obtener los datos de la materia para editar");
      }
    );
  }
}