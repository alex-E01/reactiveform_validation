import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  index: any;
  userData: any = [];
  userlist:any =[];
  singleuser:any;
  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    gender: new FormControl('', Validators.required),
    fathername: new FormControl('', [Validators.required, Validators.minLength(2)]),
    mothername: new FormControl('', [Validators.required, Validators.minLength(2)]),
    mobilenumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    email: new FormControl('', Validators.required),
    address: new FormControl('', [Validators.required, Validators.minLength(15)]),

  });

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router
    ) {


    this.index=this.activatedRoute.snapshot.paramMap.get("id");
    console.log("index:",this.index);

    this.activatedRoute.queryParams.subscribe(params => {
      // console.log('Recieved on edit page:', params);
      this.singleuser = JSON.parse(params['mydata']);
      // console.log(this.singleuser);
      this.profileForm.controls['firstName'].setValue(this.singleuser.firstName);
      this.profileForm.controls['lastName'].setValue(this.singleuser.lastName);
      this.profileForm.controls['gender'].setValue(this.singleuser.gender);
      this.profileForm.controls['fathername'].setValue(this.singleuser.fathername);
      this.profileForm.controls['mothername'].setValue(this.singleuser.mothername);
      this.profileForm.controls['mobilenumber'].setValue(this.singleuser.mobilenumber);
      this.profileForm.controls['email'].setValue(this.singleuser.email);
      this.profileForm.controls['address'].setValue(this.singleuser.address);


    });
  } 

  ngOnInit() {

    let saveData: any = localStorage.getItem('userData');
    if (saveData != null) {
      this.userlist = JSON.parse(saveData);
      // console.log("userlist:", this.userlist);
    }
  }

  onSubmit(value: any) {
    this.userlist[this.index]=value;
    localStorage.setItem('userData',JSON.stringify( this.userlist));

  }

}
