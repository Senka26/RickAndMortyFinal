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
      this.submitEM.emit(this.form.value);
      console.log('Login successful. Navigating to /header');
      // this.router.navigateByUrl('/header');
      this.router.navigate(['/header']);
    } else {
      console.log('Form is not valid. Cannot navigate.');
    }
  }

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
}
