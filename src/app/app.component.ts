import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  registrationForm: FormGroup;

  //pasa ese atributo para los validadores de input nombre
  get nombre(){
    return this.registrationForm.get('nombre');
  }

  get email(){
    return this.registrationForm.get('email');
  }

  get alternateEmails(){
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail(){
    this.alternateEmails.push(this.fb.control(''));
  }

  constructor(private fb: FormBuilder){}

    ngOnInit(){
      this.registrationForm = this.fb.group({
        nombre: ['',[Validators.required, Validators.minLength(4)]],
        password: [''],
        confirmPassword: [''],
        email: [''],
        subscribe: [false],
        address: this.fb.group({
          ciudad: [''],
          provincia: [''],
          postal: [''],
        }),
        alternateEmails: this.fb.array([])
      })
      
      this.registrationForm.get('subscribe').valueChanges.subscribe(checkedValue => {
        const email = this.registrationForm.get('email');
        if(checkedValue){
          email.setValidators(Validators.required);
        }else{
          email.clearValidators();
        }
        email.updateValueAndValidity();
      });
    }
    
  

  loadApiData(){

    this.registrationForm.patchValue({
      nombre: 'Bruce',
      address:{
        ciudad: 'Genova',
      }
    });
  }

  onSubmit(){
    console.log(this.registrationForm.value);
  }
}
