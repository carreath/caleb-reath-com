import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  animations: [
    trigger('fade', [
      state("hidden", style({opacity: 0})),
      transition('hidden => show', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
      transition('show => hidden',[
        style({opacity: 0})
      ]),
    ])
  ]
})
export class ContactFormComponent implements OnInit {

  isLoading = false;
  isSuccessful = false;
  formClassState = 'ui equal width form segment';

  contactMeForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    contactNumber: new FormControl('', [
      Validators.maxLength(10),
      Validators.pattern('^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200)
    ])
  });

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  public sendEmail() {
    this.toggleLoading();
    this.dataService.saveContactDetails(this.contactMeForm.value)
      .then(() => {
        this.toggleSuccess();
      })
      .catch(err => {
        console.error('An error has occurred: ', err.message);
      })
      .finally(() => {
        this.contactMeForm.reset();
        if (!this.isSuccessful) {
          this.toggleLoading();
        }
      });
  }

  public toggleLoading() {
    if (this.isLoading) {
      this.isLoading = false;
      this.formClassState = 'ui equal width form segment';
    } else {
      this.isLoading = true;
      this.formClassState = 'ui equal width form loading segment';
    }
  }

  public toggleSuccess() {
    if (this.isSuccessful) {
      this.isSuccessful = false;
      this.formClassState = 'ui equal width form segment';
    } else {
      this.isSuccessful = true;
      this.formClassState = 'ui equal width form segment success';
    }
  }

  public hideSuccess(): boolean {
    return this.contactMeForm.touched;
  }

  @ViewChild("ContactMe", { read: ElementRef }) this_component: ElementRef;

  state: string = "hidden";
  init = true;

  @HostListener('window:scroll', ['$event']) 
  onScroll(event) {
    if (this.state === "hidden" && this.this_component.nativeElement.getBoundingClientRect().y <= window.innerHeight * 0.8) {
      this.state = "show";
    } else if (this.state === "show" && this.this_component.nativeElement.getBoundingClientRect().y > window.innerHeight) {
      this.state = "hidden";
    }
  }
}