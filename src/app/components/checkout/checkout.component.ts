import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup; // Using definite assignment assertion "!"

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
    });
  }

  onSubmit() {
    console.log('handling the submit button');
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log(
      'the email ist' + this.checkoutFormGroup.get('customer')?.value.email
    );
  }
}
