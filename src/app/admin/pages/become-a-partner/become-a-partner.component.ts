import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from 'src/app/helpers/utils';
import { Errors } from 'src/app/model/auth-model';
import { Contacts } from 'src/app/model/common-models';
import { AccountService } from 'src/app/services/account.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-become-a-partner',
  templateUrl: './become-a-partner.component.html',
  styleUrls: ['./become-a-partner.component.css'],
})
export class BecomeAPartnerComponent implements OnInit, OnDestroy {
  @ViewChild('aboutSelection') aboutSelection!: ElementRef;

  faPaperPlane = faPaperPlane;

  submitted: boolean = false;
  loading: boolean = false;
  successful: boolean = false;
  fullName: string = '';
  error: string;
  email: string;
  mobile: string;
  message: string;
  returnUrl: string;
  about: string = 'Other';
  destroy$ = new Subject<void>();
  errors: Errors = { errors: {} };
  errorMessage: string = null;

  private utils = inject(Utils);
  private contactService = inject(ContactsService);
  private toastService = inject(ToastService);

  response: string = null;

  ngOnInit(): void {
    this.loading = false;
    this.submitted = false;
    this.successful = false;
  }

  submit() {
    // stop here if form is invalid
    if (this.utils.isEmpty(this.email)) {
      this.error = 'Email is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.fullName)) {
      this.error = 'Fullname is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.mobile)) {
      this.error = 'Mobile is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.message)) {
      this.error = 'Message is mandatory';
      return;
    }
    this.submitted = true;
    this.response = null;
    this.errorMessage = null;
    // reset alerts on submit
    this.loading = true;
    var c: Contacts = {
      fullName: this.fullName,
      email: this.email,
      mobile: this.mobile,
      about: this.about,
      message: this.message,
    };
    console.log('Submitting your message..');
    let observable = this.contactService.createContact(c);
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.loading = false;
        this.errorMessage = null;
        this.toastService.info("Your message has been sent. The customer support team will get in touch with you shortly.");
        // this.response =
          // 'Your message has been sent. The customer support team will get in touch with you shortly.';
      },
      error: (err) => {
        console.error('Error when sending your message.' + JSON.stringify(err));
        this.errors = err;
        this.loading = false;
        this.errorMessage = err.error.detail;
      },
    });
  }

  onChangeAbout() {
    this.about = this.aboutSelection.nativeElement.value;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
