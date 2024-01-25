import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: object = {
    name: "rick",
    password: "morty"
  }

  constructor(
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  username: string = '';
  password: string = '';

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      if(this.user['name'] === this.username && this.user['password'] === this.password) {
        this.submitEM.emit(this.form.value);
        this.router.navigate(['/header']);
      } else {
        this.error = "Error: Wrong username or password.";
      }
    } else {
      this.error = "Error: Form is not valid.";
    }
  }

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
}
