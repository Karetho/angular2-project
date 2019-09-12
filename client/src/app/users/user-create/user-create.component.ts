import { MessageService } from "src/app/message.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsersService } from "../service/users.service";
import { FormBuilder, Validators, ValidationErrors } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.css"]
})
export class UserCreateComponent implements OnInit {
  user;
  userSubscription: Subscription;
  checkoutForm;

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {}
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
    console.log(this.checkoutForm.status);
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

    console.warn("Your user has been created", customerData);
    this.userSubscription = this.userService.addUser(customerData).subscribe(
      newUser => {
        this.messageService.sendMessage("New user has been created");
        this.router.navigateByUrl("/users");
      },
      err => console.log(err),
      () => this.userSubscription.unsubscribe()
    );
  }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]]
    });
  }
}
