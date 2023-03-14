import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/interfaces/myInterface';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {

    subscription!: Subscription;
    dataSource!: MatTableDataSource<User>;
    displayedColumns: string[] = ['name', 'gender', 'teamselect', 'hobby', 'dob', 'created_at', 'actions'];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    public datePipe = new DatePipe('en-US');

    constructor(private userService: UserService) { }

    userData: any;
    undeletedData!: any[];

    ngOnInit(): void {
        this.subscription = this.userService.getUsers().subscribe({
            next: (data) => {
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.userData = data;
                this.undeletedData = data.filter((item: any) => !item.deleted);
            },
            error: (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            }
        });
    }

    deleteUser(user: any) {
        Swal.fire({
            title: `Are you sure to delete "${user.name}"`,
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                this.userService.deleteUser(user.id).subscribe({
                    next: (data) => {
                        user.deleted = true;
                        this.userData = this.userData.filter((item: any) => !item.deleted);
                        this.dataSource.data = this.userData;
                        this.undeletedData = this.userData.filter((item: any) => !item.deleted);
                    }
                });
                Swal.fire({
                    title: ` "${user.name}" has been deleted!`,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
