import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireServiceProvider } from 'src/providers/api-service/fire-service';
import { FirebaseAuthService } from 'src/providers/api-service/firebase-auth-service';
import { Usuario } from '../modelo/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private usu = new Usuario();

  registerForm!: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder,
    private fireAuth:FirebaseAuthService,
    private fireService:FireServiceProvider) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    }
    
    )
  }



 
 
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid)
      return;

    let values=this.registerForm.value

    this.fireAuth.loginUser(values['email'],values['password'])
    .then(()=>{
        this.fireService.getUsuarioByEmail(values['email'])
        .then((data:Usuario)=>{

          console.log(data)
          

        }).catch((error:string)=>{
          console.log(error)
        })

    }).catch((error:string)=>{
      console.log(error)
    })


  }
}
