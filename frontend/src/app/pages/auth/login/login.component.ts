import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/authentication/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(private fb:FormBuilder, private loginService:LoginService, private router:Router){
    this.loginForm = this.fb.group({
      email : ["",[Validators.required]],
      password:['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(){}

  onLogin(){
    console.log("clicked login");
    console.log(this.loginForm.value);
    
    if(this.loginForm.valid){
      const formData = this.loginForm.value;
      this.loginService.login(formData).subscribe({
        next: (response) => {
          console.log("user logged in successfully", response);
         this.router.navigate(['/dashboard']) ;
        },
        error: (error) => {
          console.error("login failed", error)
        }
    })
    }
  }


}
