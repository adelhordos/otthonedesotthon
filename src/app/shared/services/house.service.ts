import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { House } from '../models/House';
import {Rate} from "../models/Rate";

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  collectionName = 'Houses';

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  getHouses(): Observable<House[]> {
    return this.afs.collection<House>(this.collectionName, ref => ref.orderBy('price','asc')).valueChanges().pipe(
      switchMap((houses: House[]) => {
        const getImageUrls = houses.map((house: House) =>
          this.loadImage(house.photo).pipe(map((url: string) => ({ ...house, imageUrl: url })))
        );
        return forkJoin(getImageUrls);
      })
    );
  }

  loadImage(imageUrl: string): Observable<string> {
    return this.storage.ref(imageUrl).getDownloadURL();
  }

  create(house: House){
    house.id = this.afs.createId();
    return this.afs.collection<House>(this.collectionName).doc(house.id).set(house);
  }
}
