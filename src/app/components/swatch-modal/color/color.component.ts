import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { Palette, Swatch } from 'node-vibrant/lib/color';
import { Color } from 'src/app/models/color';
import { SwatchModalComponent } from '../swatch-modal.component';
import { StorageService } from 'src/app/services/storage.service';
import { copy } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  standalone: true,
  imports:[CommonModule, IonicModule]
})
export class ColorComponent  implements OnInit {
  @Input() color!: Color;
  selectedSwatch?: Swatch;
  constructor(private modalCtrl: ModalController, private storageService: StorageService) {
    addIcons({ copy })
   }

  ngOnInit() {
    this.selectedSwatch = this.color.palette.Vibrant;
  }


  async openModal (palette: Palette) {
    const modal = await this.modalCtrl.create({
      backdropDismiss:false,
      component: SwatchModalComponent,
      componentProps: {
        palette,
        selectedSwatch: this.selectedSwatch
      },
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    this.selectedSwatch = data;
  }

  saveColor(color: Color) {
    console.log(color);
    this.storageService.set(color.id, color.imagePath
    );
  }

  deleteColor(color: Color) {
    this.storageService.remove(color.id);
  }

}
