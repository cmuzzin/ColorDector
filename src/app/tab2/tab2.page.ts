import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { Color } from '../models/color';
import { ColorComponent } from '../components/swatch-modal/color/color.component';
import Vibrant from 'node-vibrant';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ColorComponent],
})
export class Tab2Page {
  colors: Array<Color> = [];
  constructor(private storageService: StorageService) {}


  ionViewDidEnter() {
    this.storageService._storage?.forEach((x) => {
      console.log(x);
      const vibrant = new Vibrant(x);
      vibrant.getPalette().then(palette => {
        const colorId =  x.split('/')[3];
        const color = { id: colorId?? '', imagePath: x, palette };
        this.colors.push(color);
      });
    });
  }

  ionViewDidLeave() {
    this.colors = [];
    this.storageService.clear();
  }

}
