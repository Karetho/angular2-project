import { MessageService } from "./../../message.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsersService } from "../service/users.service";
import { FormBuilder, Validators, ValidationErrors } from "@angular/forms";
import { Router, Params } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user-edit",
  templateUrl: "../user-create/user-create.component.html",
  styleUrls: ["../user-create/user-create.component.css"]
})
export class UserEditComponent implements OnInit, OnDestroy {
  userId;
  user;
  editedUser;
  editedUserSubscription;
  usersSubscription: Subscription;
  public checkoutForm;
  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.checkoutForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]]
    });
  }
  getErrorMailMessage() {
    return this.checkoutForm.get("email").hasError("required")
      ? "You must enter a value"
      : this.checkoutForm.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }
  getErrorFirstNameMessage() {
    return this.checkoutForm.get("firstName").hasError("required")
      ? "You must enter a value"
      : "";
  }
  getErrorLastNameMessage() {
    return this.checkoutForm.get("lastName").hasError("required")
      ? "You must enter a value"
      : "";
  }
  get email() {
    return this.checkoutForm.get("email");
  }
  get firstName() {
    return this.checkoutForm.get("firstName");
  }
  get lastName() {
    return this.checkoutForm.get("lastName");
  }

  onSubmit(customerData) {
    // Process checkout data here
    if (this.checkoutForm.status == "INVALID") {
      Object.keys(this.checkoutForm.controls).forEach(key => {
        const controlErrors: ValidationErrors = this.checkoutForm.get(key)
          .errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log(
              "Key control: " +
                key +
                ", keyError: " +
                keyError +
                ", err value: ",
              controlErrors[keyError]
            );
          });
        }
      });
      return;
    }
    console.warn("Your user has been edited", customerData);
    customerData._id = this.userId;
    this.editedUserSubscription = this.usersService
      .updateUser(customerData)
      .subscribe(
        newUser => {
          console.log(newUser);
          this.messageService.sendMessage("User has been edited");
          this.router.navigateByUrl("/users");
        },
        err => console.log(err),
        () => this.editedUserSubscription.unsubscribe()
      );
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("userId");
    this.usersSubscription = this.usersService.getUser(this.userId).subscribe(
      user => {
        this.user = user;
        this.checkoutForm = this.formBuilder.group({
          firstName: [this.user.firstName, Validators.required],
          lastName: [this.user.lastName, Validators.required],
          email: [this.user.email, [Validators.required, Validators.email]]
        });
      },
      err => console.error(err),
      () => console.log("users subscription completed")
    );
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
}
