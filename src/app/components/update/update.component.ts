import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team, Role, UserForm } from 'src/app/interfaces/myInterface';

import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})

export class UpdateComponent implements OnInit {
    showPassword: boolean = false;
    confirmshowPassword: boolean = false;
    userForm: UserForm = {
        name: '',
        email: '',
        password: '',
        cpassword: '',
        gender: '',
        teamselect: '',
        roleselect: '',
        picker: '',
        description: '',
        reading: false,
        swimming: false,
        cooking: false
    };
    selectedTeam!: string;
    selectedRole!: string;
    teams: Team[] = [
        { value: 'wordpress', viewValue: 'WordPress' },
        { value: 'java', viewValue: 'Java' },
        { value: 'php', viewValue: 'PhP' },
        { value: 'nodejs', viewValue: 'NodeJs' }
    ]
    roles: Role[] = [
        { value: 'manager', viewValue: 'Manager' },
        { value: 'member', viewValue: 'Member' },
        { value: 'user', viewValue: 'User' },
    ]

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) { }


    ngOnInit(): void {
        this.route.paramMap.subscribe((param) => {
            var id = Number(param.get('id'));
            this.getById(id);
        });
    }

    getById(id: number) {
        this.userService.getById(id).subscribe((data) => {
            this.userForm = data;
            this.selectedTeam = this.userForm.teamselect;
            this.selectedRole = this.userForm.roleselect;
        });
    }

    update() {
        this.userService.updateUser(this.userForm)
            .subscribe({
                next: (data) => {
                    Swal.fire({
                        title: "Updated",
                        text: `User "${this.userForm.name}" updated successfully`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.router.navigate(["/user_list"]);
                },
                error: (err) => {
                    Swal.fire({
                        title: "Updated",
                        text: `Error updating data ${err}`,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

}
