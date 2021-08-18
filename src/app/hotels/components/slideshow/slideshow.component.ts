import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {
  @Input() photos: any[] = [];
  currentPhotoIndex = 0;
  constructor() { }

  ngOnInit(): void {
    console.log(this.photos)
  }

  selectImage(index: number){
    console.log(this.photos)
    this.currentPhotoIndex = index > (this.photos.length - 1) || index < 0 ? this.currentPhotoIndex : index;
  }
}
