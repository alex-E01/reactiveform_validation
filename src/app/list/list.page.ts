import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormControl,FormGroup,Validators} from '@angular/forms';
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  userlist: any = [];
  editform:FormGroup;
  constructor(
    public router : Router,
    private alertController: AlertController
  ) { 


    this.editform=new FormGroup({


    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    fathername: new FormControl('',Validators.required),
    mothername: new FormControl('',Validators.required),
    mobilenumber: new FormControl('',Validators.pattern('[0-9]+')),
    email: new FormControl('',[Validators.required,Validators.email]),
    address: new FormControl('',Validators.required),

    });
    
  }
  

  onSubmit(value:any){

    console.log(value)

  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.showdata();
  }
  showdata() {
    let saveData: any = localStorage.getItem('userData');
    if (saveData != null) {
      this.userlist = JSON.parse(saveData);
      console.log("userlist:", this.userlist);
    }
  }
  
  async presentAlert(index:any) {
    console.log(index);
    const alert = await this.alertController.create({
      header: 'Do you want to delete ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
           console.log("Cancle");
          },
        },
        {
          text: 'YES',
          role: 'confirm',
          handler: () => {
            // console.log("Deleted Successfully");
            this.userlist.splice(index,1);
            localStorage.setItem('userData',JSON.stringify(this.userlist));
            
            console.log("Deleted Successfully");
            
          },
        },
      ],
    });

    await alert.present();
    
  }
  transferdata(data:any,i:any){
    console.log('data',data)
    const navigationExtras = {

    queryParams:{
      mydata:JSON.stringify(data),
    }
    };
    // console.log('transferdata:',data);
    this.router.navigate(['/edit/'+i],navigationExtras);
  }
 
}
