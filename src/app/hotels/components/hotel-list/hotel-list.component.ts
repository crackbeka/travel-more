import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { FileUpload } from 'src/app/classes/file-upload';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { UserService } from 'src/app/services/user/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
  modalState: boolean = false;
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  selectedHotelId: string = '';
  hotelForm: any;
  emptyHotelForm: any = {
    manager_id: "",
    name: "",
    city: "",
    address: "",
    kids: "",
    stars: "",
    fitness: false,
    wifi: false,
    parking: false,
    restaurant: false,
    pool: false,
    sauna: false,
    images: [],
    verified: false,
    rooms: [],
    created_at: null
  };

  room: any = {
    name: "",
    price: 0,
    sold_dates: [],
    people: 0,
    wifi: false,
    breakfast: false,
    mini_bar: false,
    tv: false,
    conditioner: false,
    city_view: false,
    heating: false,
    fridge: false
  };

  hotels: any[] = [];

  uploading = false;

  canAddHotel = false;
  canEditHotel = false;
  canRemoveHotel = false;
  canVerifyHotel = false;
  user: any;
  userRole: string | undefined;
  selectedRoomIndex: number = -1;

  constructor(private auth: AngularFireAuth, private uploadService: FileUploadService, private hotelService: HotelService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserRole().subscribe((role) => {
      this.canAddHotel = role === 'HOTEL';
      this.canEditHotel = role !== 'GUEST';
      this.canRemoveHotel = role === 'ADMIN';
      this.canVerifyHotel = role === 'ADMIN';
      this.userRole = role;

      this.auth.user.subscribe(user => {
        this.user = user?.uid;
        if (this.user) {
          this.getHotels().subscribe((res: any) => this.hotels = res);
        }
      });
    });
  }

  getHotels(){
    if(this.userRole === 'HOTEL') {
      return this.hotelService.getHotelsForUser(this.user);
    } else if (this.userRole === 'ADMIN') {
      return this.hotelService.getAllHotels();
    } else {
      return this.hotelService.getVerifiedHotels();
    }
  }

  search(event: any){
    this.getHotels().subscribe((res: any) => this.hotels = res.filter((x:any) => x.data.name.toLowerCase().includes(event.target.value.toLowerCase())));
  }

  toggleModal(hotel?: any){
    this.selectedHotelId = hotel ? hotel.key : '';
    this.modalState = !this.modalState;
    this.hotelForm = hotel ? JSON.parse(JSON.stringify(hotel.data)) : JSON.parse(JSON.stringify(this.emptyHotelForm))
  }

  //Hotel Actions
  saveHotel(){
    if(this.selectedHotelId){
      this.hotelService.updateHotel(this.selectedHotelId, this.hotelForm)
          .then(res => this.toggleModal())
    }else{
      this.hotelForm['manager_id'] = this.user;
      this.hotelForm['created_at'] = new Date().toISOString();
      this.hotelService.saveHotel(this.hotelForm).then(res => this.toggleModal())
    }
  }

  verifyHotel(hotel: any){
    if(this.canVerifyHotel){
      hotel.data.verified = true;
      this.hotelService.updateHotel(hotel.key, hotel.data)
            .then(res => res)
    }
  }

  deleteHotel(hotel: any){
    if(this.canRemoveHotel){
      if(hotel.data.images){
        while(hotel.data.images.length){
          const fileToDelete = hotel.data.images[0].name;
          hotel.data.images.splice(0, 1);
          this.uploadService.deleteFileStorage(fileToDelete);
        }
      }
      this.hotelService.deleteHotel(hotel.key);
    }
  }

  //Image Actions
  selectFile(event: any): void {
    this.uploading = true;
    this.selectedFiles = event.target.files;
    this.upload();
  }

  deleteImage(index: number){
    const fileToDelete = this.hotelForm.images[index].name;
    this.hotelForm.images.splice(index, 1);
    this.uploadService.deleteFileStorage(fileToDelete);
  }

  upload(): void {
    if (this.selectedFiles) {
      const uploadedFiles: any[] = [];
      for(let i = 0; i < this.selectedFiles.length; i ++){
        const file: File | null = this.selectedFiles.item(i);
        if (file) {
          this.currentFileUpload = new FileUpload(file);
          this.uploadService.pushFileToStorage(this.currentFileUpload).then(
            uploadedFile => {
              uploadedFiles.push(uploadedFile);
              this.hotelForm.images = uploadedFiles;
              this.uploading = false;
            },
            error => {
              console.log(error);
            }
          );
        }
      }
      this.selectedFiles = undefined;
    }
  }

  //Room Actions

  addRoom(){
    const newRoom = JSON.parse(JSON.stringify(this.room));
    this.hotelForm.rooms.unshift(newRoom);
    this.selectRoom(0);
  }

  removeRoom(index: number){
    this.hotelForm.rooms.splice(index,1);
  }

  selectRoom(index: number){
    this.selectedRoomIndex = index;
  }
}
