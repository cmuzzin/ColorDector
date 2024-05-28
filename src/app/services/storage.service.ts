import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
   _storage: Storage | null = null;
  constructor(private storage: Storage) {
    this.init();
   }
   async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  set(key: string, imagePath: string) {
    this._storage?.set(key, imagePath);
  }

  async get(key: string): Promise<string> {
    return this._storage?.get(key);
  }

  remove(key: string) {
    this._storage?.remove(key);
  }


  clear() {
    this._storage?.clear();
  }



}
