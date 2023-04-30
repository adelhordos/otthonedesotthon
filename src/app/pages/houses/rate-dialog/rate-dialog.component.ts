import {Component, Inject, OnInit} from '@angular/core';
import {Rate} from "../../../shared/models/Rate";
import {FormBuilder, Validators} from "@angular/forms";
import {RateService} from "../../../shared/services/rate.service";
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/models/User";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-rate-dialog',
  templateUrl: './rate-dialog.component.html',
  styleUrls: ['./rate-dialog.component.scss']
})
export class RateDialogComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA)
              public data: string,
              private fb: FormBuilder,
              private rateService: RateService,
              private dialogRef: MatDialogRef<RateDialogComponent>,
              private userService: UserService) { }

  selected!: number;
  user?: User;
  ratesForm = this.createForm({
    id: '',
    username: '',
    rate: this.selected,
    houseId: this.data
  });
  ngOnInit(): void {
   const user=JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
      this.userService.getById(user.uid).subscribe(data => {
        this.user = data;
        if(this.user?.username) {
          this.ratesForm.get('username')?.setValue(this.user?.username);
        }
      }, error => {
        console.log(error);
      });
  }
  createForm(model: Rate) {
    let formGroup = this.fb.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('rate')?.addValidators([Validators.required]);
    return formGroup;
  }
  addRate() {
    if (this.ratesForm.valid) {
      if (this.ratesForm.get('username') && this.ratesForm.get('rate')) {
        this.rateService.create(this.ratesForm.value as Rate).then(_ => {
          this.dialogRef.close();
          }).catch(error => {
            console.error(error);
          });
        }}
      }
}
