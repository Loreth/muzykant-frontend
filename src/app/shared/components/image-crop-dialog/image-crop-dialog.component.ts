import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import Cropper from 'cropperjs';

export interface ImageCropDialogData {
  imgUrl: string;
  cropAspectRatio: number;
}

@Component({
  selector: 'app-image-crop-dialog',
  templateUrl: './image-crop-dialog.component.html',
  styleUrls: ['./image-crop-dialog.component.css']
})
export class ImageCropDialogComponent implements AfterViewInit {
  private cropper: Cropper;
  @ViewChild('image') public imageElement: ElementRef;
  canvas: HTMLCanvasElement;
  public croppedImageUrl: string;

  constructor(
    private dialogRef: MatDialogRef<ImageCropDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageCropDialogData) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit(): void {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      minCropBoxHeight: 100,
      minCropBoxWidth: 100,
      zoomable: false,
      scalable: false,
      movable: false,
      autoCropArea: 1,
      aspectRatio: this.data.cropAspectRatio,
      crop: () => {
        this.canvas = this.cropper.getCroppedCanvas();
        this.croppedImageUrl = this.canvas.toDataURL('image/jpeg');
      }
    });
  }
}
