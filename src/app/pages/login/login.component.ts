import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
    private router: Router,
    private formBuilder: FormBuilder,
    private service: AuthService,
    private _snackBar: MatSnackBar
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

    this.service.login(this.loginForm.value).subscribe(response => {
      localStorage.setItem("token", response.headers.get('X-Access-Token') ?? "");
      let body = { ...response.body! };
      localStorage.setItem("username", body.user.username ?? "");
      this.router.navigate(['/']);
    }, error => {
      this._snackBar.open(error.error?.error?.message ?? "Error no definido");
    });
  }

}
