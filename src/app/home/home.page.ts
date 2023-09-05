import { Component } from '@angular/core';
import { FormControl,FormGroup, Validators,FormBuilder} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BrMaskerModule } from 'br-mask';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userData: any = [];
  profileForm = new FormGroup({
    firstName: new FormControl('',[Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('',[Validators.required, Validators.minLength(2)]),
    gender: new FormControl('',Validators.required),
    fathername: new FormControl('',[Validators.required, Validators.minLength(2)]),
    mothername: new FormControl('',[Validators.required, Validators.minLength(2)]),
    mobilenumber: new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
    email: new FormControl('', Validators.compose([Validators.required, ])),
    address: new FormControl('',[Validators.required, Validators.minLength(15)]),
 
  });
  constructor(public formBuilder: FormBuilder,public router:Router, public BrMaskerModule:BrMaskerModule) {
    
  }
  ionViewWillEnter(){
     let saveData : any = localStorage.getItem('userData');
     if(saveData != null){
      this.userData = JSON.parse(saveData);
     }
  }

  onSubmit(formData:any){
    this.userData.push(formData);
    console.log("formData:",formData);
    localStorage.setItem('userData',JSON.stringify( this.userData));
    this.profileForm.reset();
  }


}
