import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateComponent } from './components/update/update.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    }
    ,
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'add_user',
        component: RegisterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'user_list',
        component: UserListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'edit_user/:id',
        component: UpdateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '/user_list'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
