import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {RateService} from "../../../shared/services/rate.service";
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/models/User";
import {Rate} from "../../../shared/models/Rate";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: any,
              private fb: FormBuilder,
              private rateService: RateService,
              private dialogRef: MatDialogRef<EditDialogComponent>,
              private userService: UserService) { }

  selected!: number;
  user?: User;
  ratesForm = this.createForm({
    id: this.data.id,
    username: '',
    rate: this.selected,
    houseId: this.data.houseId
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
  editRate() {
    if (this.ratesForm.valid) {
      const newRate = {
        id: this.ratesForm.value.id,
        username: this.ratesForm.value.username,
        rate: this.ratesForm.value.rate,
        houseId: this.ratesForm.value.houseId
      };
      this.rateService.update(newRate as Rate).then(_ => {
        this.dialogRef.close();
      }).catch(error => {
        console.error(error);
      });
    }
  }

}
