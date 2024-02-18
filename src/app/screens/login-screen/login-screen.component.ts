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
    this.errors = [];
      this.errors = this.facadeService.validarLogin(this.username, this.password);
      if(!$.isEmptyObject(this.errors))
      {
        return false;
      }
      this.router.navigate(["home"]);
  }

  public registrar(){
    this.router.navigate(["registro-usuarios"]);
  }
}
