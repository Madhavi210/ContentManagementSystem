import { Component } from '@angular/core';
import { IUser } from 'src/app/core/model/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crete-user',
  templateUrl: './crete-user.component.html',
  styleUrls: ['./crete-user.component.scss']
})
export class CreteUserComponent {
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['admin', Validators.required] // Default role can be set here
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser: IUser = {
        username: this.userForm.value.username,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        role: this.userForm.value.role
      };
      console.log('New User:', newUser);
      this.userForm.reset();
    }
  }
}


