import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  submitted = false;
  hidePassword = true;
  
  constructor(
    private formBuilder: FormBuilder
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmitLogin(){
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.loginForm.value, null, 2));

    // var codigo = Math.round(this.getRandom());

    // var form = {
    //   nombre: "Krobawsky",
    //   email: "ricardo.berrospi@tecsup.edu.pe",
    //   destino: this.email,
    //   asunto: "Codigo Verificación",
    //   mensaje: codigo
    // }

    // this.authService.loginEmail(this.email, this.password)
    // .then( (res) => {
    //   this.messageService.sendMessage(form).subscribe(() => {
    //     console.log("Codigo enviado: " + codigo);
    //   })
    //   localStorage.setItem("correo", this.email);
    //   localStorage.setItem("codigo", codigo.toString());
    //   this.router.navigate(['/codigo']);
    // }).catch((err) => {
    //   console.log(err);
    //   alert(err.message)
    // });
  }

}
