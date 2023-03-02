import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireServiceProvider } from 'src/providers/api-service/fire-service';
import { FirebaseAuthService } from 'src/providers/api-service/firebase-auth-service';
import { AppComponent } from '../app.component';
import { GlobalServiceService } from '../global-service.service';
import { Usuario } from '../modelo/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  //Objeto usuario que volveremos global
  private usu = new Usuario();

  //Booleano para controlar que aparezca el mensaje de error
  error: boolean = false;
  //Formulario
  registerForm!: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder,
    private fireAuth: FirebaseAuthService,
    private fireService: FireServiceProvider,
    private globalService:GlobalServiceService,
    private router:Router,
    private app:AppComponent) { }

  //Inicialización del formulario
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }



  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid)
      return;

    let values = this.registerForm.value
    //Intentamos loguear al usuario
    this.fireAuth.loginUser(values['email'], values['password'])
      .then(() => {

        //Intentamos traernos el usuario
        this.fireService.getUsuarioByEmail(values['email'])
          .then((data: Usuario) => {
            this.error = false;
            //Volvemos global al usuario que nos hemos traido
            this.globalService.usuarioGlobal=data;
            this.router.navigate(['/home']);
            this.app.usuarioGlobal=data;

            //Si nos lanza error es que el objeto usuario no existe
          }).catch((error: string) => {
            console.log(error)
            this.error = true
          })

        //Si nos lanza error, es que no existe el usuario registrado
      }).catch((error: string) => {
        console.log(error)
        this.error = true
      })


  }

  //Directiva para poner colorear el mensaje del error
  setColor() {
    return 'red';
  }
}
