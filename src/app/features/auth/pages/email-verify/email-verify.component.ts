import { Component } from "@angular/core";

@Component({
  selector: "ch-email-verify",
  standalone: true,
  template: `<div class="flex justify-center">
    <div class="shadow-xl p-8 text-2xl mt-10">We've sent you and email to verify your email, please review it.</div>
  </div>`,
})
export class EmailVerifyComponent {
}
