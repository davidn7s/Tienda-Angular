import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireServiceProvider } from 'src/providers/api-service/fire-service';
import { FirebaseAuthService } from 'src/providers/api-service/firebase-auth-service';
import { Usuario } from '../modelo/Usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  private usu = new Usuario();

  registerForm!: FormGroup;
  private submitted = false;


  constructor(private formBuilder: FormBuilder,private fireService:FireServiceProvider,private fireAuth:FirebaseAuthService) { }

  ngOnInit(): void {


    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      apellidos:['',Validators.required],
      cp:['',[Validators.required,Validators.minLength(5),Validators.maxLength(5)]],
      direccion:['',Validators.required],
      tfn:['',[Validators.required,Validators.pattern('[0-9]{9}')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ["", Validators.required]

    },
      {
        validator: this.MustMatch("password", "repeatPassword")
      }
    )
  }



  MustMatch(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup. controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl. errors && !matchingControl.errors['mustMatch'])
        // return if another validator has already found an error on the matchingControl
        return;
      // set error on matchingControl if validation fails
      if (control. value !== matchingControl. value) {
        matchingControl.setErrors({ mustMatch: true });
      }else {
        matchingControl.setErrors (null);
      }
  }
}
 



  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid)
      return;

    let values=this.registerForm.value;
    this.usu.nombre=values['name'];
    this.usu.apellidos=values['apellidos'];
    this.usu.cod_postal=values['cp'];
    this.usu.direccion=values['direccion'];
    this.usu.telefono=values['tfn'];
    this.usu.email=values['email'];
    
    this.fireService.getUsuarioByEmail(values['email'])
    .then((usuario:Usuario)=>{
      let control=this.comprobarUsuario(values['email']);
      if(control){
        alert('Este email ya está en uso')
      }else{
        this.registrarUsuario(values['email'],values['password'])
      }
      
    }).catch(()=>{
      this.fireService.insertarUsuario(this.usu)
      .then(()=>{
        this.fireAuth.registerUser(values['email'],values['password'])
        .then(()=>{
          window.location.replace('')
        }).catch((error:string)=>{
          console.log(error)
        })
      })
    })
  }


  registrarUsuario(email:string,password:string){
    this.fireService.insertarUsuario(this.usu)
    .then(()=>{
      this.fireAuth.registerUser(email,password)
      .then(()=>{
        window.location.replace('')
      }).catch((error:string)=>{
        console.log(error)
      })
    })
  }


  comprobarUsuario(email:string):boolean|any{
    this.fireService.getUsuarioByEmail(email)
    .then((usuario:Usuario)=>{
      if(usuario.id==undefined){
         return true
      }else{
       return false
      }
  })
  }

}

