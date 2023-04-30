import { Component, OnInit } from '@angular/core';
import { House } from '../../shared/models/House';
import { HouseService } from '../../shared/services/house.service';
import { Rate } from '../../shared/models/Rate';
import { RateService } from '../../shared/services/rate.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RateDialogComponent } from './rate-dialog/rate-dialog.component';
import {EditDialogComponent} from "./edit-dialog/edit-dialog.component";

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss']
})
export class HousesComponent implements OnInit {
  houses?: House[];
  rates: Map<string, Rate[]> = new Map();
  searchText: string ='';

  constructor(
    private fb: FormBuilder,
    private houseService: HouseService,
    private rateService: RateService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadHousesWithRates();
  }

  loadHousesWithRates() {
    this.houseService.getHouses().subscribe(async (houses) => {
      this.houses = await Promise.all(
        houses.map(async (house) => {
          const url = await this.houseService.loadImage(house.photo).toPromise();
          this.rateService.getRatesByHouseId(house.id).subscribe((rate) => {
            this.rates.set(house.id, rate);
          });
          return { ...house, photoUrl: url };
        })
      );
    });
  }
  rateDialog(id: string) {
    const dialogRef = this.dialog.open(RateDialogComponent, { data: id });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onSearchTextEntered(searchValue: string){
    this.searchText = searchValue;
    console.log(this.searchText);
  }

  deleteThisRate(rateId: string) {
    this.rateService.delete(rateId);
  }

  editDialog(id: string, houseId: string) {
    const dialogRef = this.dialog.open(EditDialogComponent, { data: { id: id, houseId: houseId } });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
