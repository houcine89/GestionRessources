import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-card-input',
  templateUrl: './new-card-input.component.html',
  styleUrls: ['./new-card-input.component.scss'],
  host: {'class': 'col-4'}
})
export class NewCardInputComponent implements OnInit {
  public newCard: any = {text: ''};
  @Output() onCardAdd = new EventEmitter<string>();
  @ViewChild('form') public form: NgForm;
  newCardForm: FormGroup;

  constructor(fb: FormBuilder) { 
    this.newCardForm = fb.group({
      'text': ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    });
  }

  ngOnInit() {
  }
  

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.code === "Enter" || event.code === "NumpadEnter") && this.newCardForm.valid) {
      this.addCard(this.newCardForm.controls['text'].value);
    }
  }

  addCard(text) {
    this.onCardAdd.emit(text);
    this.newCardForm.controls['text'].setValue('');
  }
}
