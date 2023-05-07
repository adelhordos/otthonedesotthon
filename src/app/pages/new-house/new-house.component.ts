import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {House} from "../../shared/models/House";
import {HouseService} from "../../shared/services/house.service";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "@angular/fire/storage";
import {Router} from "@angular/router";
import {MatRadioChange} from "@angular/material/radio";


@Component({
  selector: 'app-new-house',
  templateUrl: './new-house.component.html',
  styleUrls: ['./new-house.component.scss']
})
export class NewHouseComponent implements OnInit {
  selected?: '';
  file: any = {};
  newHouseForm = new FormGroup({
    isRent: new FormControl(true),
    location: new FormControl(''),
    price: new FormControl(0),
    type: new FormControl(this.selected),
    photo: new FormControl('',Validators.required)
  });
  storage = getStorage();
  metadata = {
    contentType: 'image/jpeg'
  };
  loading: boolean = false;

  constructor(private houseService: HouseService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    if (!this.file) {
      console.log('No file selected');
      return;
    }

    const storageRef = ref(this.storage, 'images/' + this.file.name);
    const uploadTask = uploadBytesResumable(storageRef, this.file, this.metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error);
      },
      () => {
        if (this.newHouseForm.valid) {
          this.loading = true;
            this.houseService.create(this.newHouseForm.value as House).then(_ => {
              this.router.navigateByUrl('/houses');
            }).catch(error => {
              console.error(error);
            }).finally(()=>{
              this.loading=false;
            });
          }
        else{
          console.log('Képet kötelező feltölteni! Figyelem, a CRUD művelet nem itt van megvalósítva!')
        }
      }
    );
  }

  selectFile(event: any) {
    this.file = event.target.files[0];
    const filePath = event.target.value.split('\\').reverse()[0];
    this.newHouseForm.controls['photo'].setValue('images/'+filePath);
  }

  onChange($event: MatRadioChange) {
    this.newHouseForm.controls['isRent'].setValue($event.value);
  }
}
