import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { Palette, Swatch } from 'node-vibrant/lib/color';

@Component({
  selector: 'app-swatch-modal',
  templateUrl: './swatch-modal.component.html',
  styleUrls: ['./swatch-modal.component.scss'],
  standalone: true,
  imports:[IonicModule]
})
export class SwatchModalComponent  implements OnInit {
  palette: Palette | undefined;
  selectedSwatch!: Swatch;
  swatches: Array<Swatch | undefined> = [];
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if (this.palette) {
      this.swatches = Object.values(this.palette);
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(this.selectedSwatch, 'cancel');
  }

  select(swatch: Swatch | undefined) {
    return this.modalCtrl.dismiss(swatch, 'select');
  }

}
