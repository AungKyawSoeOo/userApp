import { Component,OnInit } from '@angular/core';
import { Team, Role } from 'src/app/interfaces/myInterface';
import { FormGroup, FormControl, Validators, AbstractControlOptions, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],

})

export class RegisterComponent implements OnInit{

    showHeader!: boolean;
    loggedIn!: boolean;

    constructor(private service: AuthService,private userService:UserService, private router: Router,private activatedRoute: ActivatedRoute) {
        this.registerForm.controls['teamselect'].setValue(this.teams[0].value);
        this.registerForm.controls['roleselect'].setValue(this.roles[2].value);
    }

  ngOnInit() {
    this.activatedRoute.url.subscribe(url => {
      this.showHeader = (url[0].path === 'add_user');
    });
    this.loggedIn = this.service.isLoggedIn();
  }


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


    showPassword: boolean = false;
    confirmshowPassword: boolean = false;
    selectedTeam = this.teams[0].value;
    selectedRole = this.roles[2].value;
    selectedDate!: Date;
    reading: boolean = false;
    swimming: boolean = false;
    cooking: boolean = false;
    isLoggedIn?:boolean;

    registerForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{4,7}')]),
        cpassword: new FormControl('', [Validators.required]),
        gender: new FormControl('male', Validators.required),
        teamselect: new FormControl('', Validators.required),
        roleselect: new FormControl('', Validators.required),
        picker: new FormControl('', Validators.required),
        description: new FormControl(''),
        reading: new FormControl(false),
        swimming: new FormControl(false),
        cooking: new FormControl(false)
    }, { validators: [this.passwordMatchValidator, this.checkAtLeastOneCheckbox] } as AbstractControlOptions)

    passwordMatchValidator(control: FormGroup) {
        const password = control.get('password');
        const cpassword = control.get('cpassword');
        if (password && cpassword && password.value !== cpassword.value) {
          cpassword.setErrors({ passwordMismatch: true });
        } else {
          cpassword!.setErrors(null);
        }
      }

    checkAtLeastOneCheckbox(control: FormGroup): ValidationErrors | null {
        const reading = control.get('reading')?.value;
        const swimming = control.get('swimming')?.value;
        const cooking = control.get('cooking')?.value;
        if (!reading && !swimming && !cooking) {
            return { atLeastOneCheckbox: true };
        }
        return null;
    }

    register() {
        if (this.registerForm.valid) {
            this.service.proceedRegister(this.registerForm.value).subscribe(res => {
                this.router.navigate(['login']);
            })
        } else {

        }
    }

    addUser() {
        if (this.registerForm.valid) {
            this.userService.createUser(this.registerForm.value).subscribe(res => {
                Swal.fire({
                    title: "Success",
                    text: `User "${this.registerForm.value.name}" added successfully`,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
                this.router.navigate(['user_list']);
            })
        }
    }

    onSubmit(): void {
        if (this.service.isLoggedIn()) {
          this.addUser();
        } else {
          this.register();
        }
    }

    get getName() {
        return this.registerForm.get('name');
    }

    get getEmail() {
        return this.registerForm.get('email');
    }

    get getPassword() {
        return this.registerForm.get('password');
    }

    get getConfirmPassword() {
        return this.registerForm.get('cpassword');
    }

    get getDate() {
        return this.registerForm.get('picker');
    }

    get getReading() {
        return this.registerForm.get('reading')
    }

    get getSwimming() {
        return this.registerForm.get('swimming');
    }

    get getCooking() {
        return this.registerForm.get('cooking');
    }

}
