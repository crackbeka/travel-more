import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { FileUpload } from 'src/app/classes/file-upload';
import { HotelService } from 'src/app/services/hotel/hotel.service';

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
    images: []
  }

  constructor(private uploadService: FileUploadService, private hotelService: HotelService) {}

  ngOnInit(): void {
  }

  toggleModal(){
    this.modalState = !this.modalState;
  }

  save(){
    this.hotelService.saveHotel(this.hotelForm).then(res => alert(res + "Saved Successfully"))
  }

  selectFile(event: any): void {
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
