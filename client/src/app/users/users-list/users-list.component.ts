import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";

import { UsersService } from "../service/users.service";
import { User } from "../service/user";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"]
})
export class UsersListComponent implements OnInit, OnDestroy {
  usersLists: User[];
  usersSubscription: Subscription;
  userSubscirptionDeleted;
  userDeleted;

  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "email",
    "edit",
    "delete"
  ];

  constructor(private usersService: UsersService, private router: Router) {}

  fetchUsers() {
    this.usersSubscription = this.usersService.getUsers().subscribe(user => {
      this.usersLists = user;
    });
  }

  onEditUser(user) {
    // Process checkout data here
    this.router.navigate(["/users/edit", user._id]);
  }

  onDeleteUser(userId) {
    // Process checkout data here
    confirm("Are you sure to delete this user?");
    console.warn("Your user has been deleted", userId);
    this.userSubscirptionDeleted = this.usersService
      .deleteUser(userId)
      .subscribe(oldUser => {
        this.userDeleted = oldUser;
        this.fetchUsers();
      });
  }
  ngOnInit() {
    this.fetchUsers();
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
}
