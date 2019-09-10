import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserCreateComponent } from "./users/user-create/user-create.component";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { UsersListComponent } from "./users/users-list/users-list.component";

const routes: Routes = [
  { path: "users", component: UsersListComponent },
  { path: "users/add", component: UserCreateComponent },
  { path: "users/edit/:userId", component: UserEditComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: "reload"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
