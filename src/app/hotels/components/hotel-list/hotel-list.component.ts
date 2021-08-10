import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { FileUpload } from 'src/app/classes/file-upload';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { UserService } from 'src/app/services/user/user.service';

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
  hotelForm: any = {
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
    verified: false
  }

  uploading = false;

  canAddHotel = false;
  canRemoveHotel = false;
  canVerifyHotel = false;
  canViewUnverified = false;

  constructor(private uploadService: FileUploadService, private hotelService: HotelService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserRole().subscribe((role) => {
      this.canAddHotel = role === 'HOTEL';
      this.canRemoveHotel = role === 'ADMIN';
      this.canVerifyHotel = role === 'ADMIN';
      this.canViewUnverified = role !== 'GUEST';
    });
  }

  toggleModal(){
    this.modalState = !this.modalState;
  }

  save(){
    this.hotelService.saveHotel(this.hotelForm).then(res => alert(res + "Saved Successfully"))
  }

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
      console.log(this.selectedFiles);
      const uploadedFiles: any[] = [];
      for(let i = 0; i < this.selectedFiles.length; i ++){
        const file: File | null = this.selectedFiles.item(i);
        if (file) {
          this.currentFileUpload = new FileUpload(file);
          this.uploadService.pushFileToStorage(this.currentFileUpload).then(
            uploadedFile => {
              uploadedFiles.push(uploadedFile);
              this.hotelForm.images = uploadedFiles;
              console.log(uploadedFile);
              this.uploading = false;
            },
            error => {
              console.log(error);
            }
          );
        }
      }
      console.log(uploadedFiles);
      this.selectedFiles = undefined;
    }
  }

  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }
}
