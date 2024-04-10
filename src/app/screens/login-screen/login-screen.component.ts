import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
declare var $: any;

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit{

  public type: String = "password";
  public username: String = "";
  public password: String = "";

  public errors:any = {};

  ngOnInit(): void {
  }

  constructor(
    private router: Router,
    public facadeService: FacadeService,
  ) { }


  public login(){
    //Validar
    this.errors = [];

    this.errors = this.facadeService.validarLogin(this.username, this.password);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    //Si pasa la validación ir a la página de home
    this.facadeService.login(this.username, this.password).subscribe(
      (response)=>{
        this.facadeService.saveUserData(response);
        this.router.navigate(["home"]);
      }, (error)=>{
        alert("No se pudo iniciar sesión");
      }
    );

  }

  public registrar(){
    this.router.navigate(["registro-usuarios"]);
  }

}
