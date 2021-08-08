import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
  modalState: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleModal(){
    this.modalState = !this.modalState;
  }

}
