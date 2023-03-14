import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {

    constructor(private service: AuthService, private route: Router, public dialog: MatDialog) { }

    userdata: any;
    hidePassword = true;
    isLoggedIn = false;

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

    openDialog() {
        this.dialog.open(DialogComponent);
    }

    login() {
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;
        this.service.proceedLogin(email, password).subscribe((res: any) => {
            this.userdata = res;
            if (res.length > 0) {
                localStorage.setItem('email', this.userdata[0].email);
                localStorage.setItem('password', this.userdata[0].password);
                Swal.fire({
                    title: "Success",
                    text: "Login success",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
                this.route.navigate(['user_list'])
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Log in failed',
                    text: 'Invalid email or password',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        });
    }

    get getEmail() {
        return this.loginForm.get('email');
    }

    get getPassword() {
        return this.loginForm.get('password');
    }
}
