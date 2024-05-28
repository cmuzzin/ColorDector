import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import Vibrant from 'node-vibrant';
import { Camera, CameraResultType } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { camera, copy } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { Color } from '../models/color';
import { ColorComponent } from '../components/swatch-modal/color/color.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ColorComponent],
})
export class Tab1Page {
  color!: Color;
  imagePath: string = '';
  constructor() {
    addIcons({ camera, copy })
  }
  async getPhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
    });
    if(image.webPath) {
      this.imagePath = image.webPath;
      const vibrant = new Vibrant(image.webPath);
      vibrant.getPalette().then(palette => {
        const colorId =  image.webPath?.split('/')[3];
        this.color = { id: colorId?? '', imagePath: this.imagePath, palette }
      });
    }
  };
}
