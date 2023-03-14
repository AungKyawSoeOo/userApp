import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

    constructor(private auth: AuthService, private router: Router) { }

    logout() {
        this.auth.logout();
        Swal.fire({
            title: "Logout",
            text: "Logout success",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
        });
        this.router.navigate(['/login']);
    }

}
