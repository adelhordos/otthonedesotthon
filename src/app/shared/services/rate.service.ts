import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Rate} from "../models/Rate";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RateService {

  collectionName= 'Rates'

  constructor(private afs: AngularFirestore) { }

  create(rate: Rate){
    rate.id = this.afs.createId();
    return this.afs.collection<Rate>(this.collectionName).doc(rate.id).set(rate);
  }
  getAll(){
    return this.afs.collection<Rate>(this.collectionName).valueChanges();
  }
  update(rate: Rate) {
    return this.afs.collection<Rate>(this.collectionName).doc(rate.id).set(rate);
  }


  delete(id: string) {
    return this.afs.collection<Rate>(this.collectionName).doc(id).delete();
  }
  getRatesByHouseId(houseId: string){
    return this.afs.collection<Rate>('Rates', ref => ref.where('houseId', '==', houseId).orderBy('rate','asc')).valueChanges();
  }
}
