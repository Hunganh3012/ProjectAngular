import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/file-upload.service';
import { image } from '@cloudinary/url-gen/qualifiers/source';
@Component({
  selector: 'app-admin-editproduct',
  templateUrl: './admin-editproduct.component.html',
  styleUrls: ['./admin-editproduct.component.scss']
})
export class AdminEditproductComponent implements OnInit {
  edit:any=[];
  constructor(private AdminService:AdminService,
    private route: ActivatedRoute,
    private Router: Router,
    private toastr :ToastrService,
    private uploadfileService:FileUploadService
    ) { }

  ngOnInit(): void {
    $(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
    });
    this.getDetailProduct()
  }
  getDetailProduct(){
    this.route.params.subscribe((data:any)=>{
      this.AdminService.getDetailProduct(data.id).subscribe(data => {this.edit=data})
    })
  }
  updateProduct(){
    
    let imageapi:any;

    const file_data=this.file[0]; 

      const data= new FormData();
      data.append('file',file_data);
      data.append('upload_preset','project-angular');
      data.append('cloud_name','db1zqfcad')
      this.uploadfileService.upload(data).subscribe(response =>{
        console.log(response)
        imageapi=response.secure_url;
        this.edit.img=imageapi;
        this.AdminService.updateProduct(this.edit.id,this.edit).subscribe(data =>{
          this.Router.navigateByUrl('/admin/admin-product')
        })
        this.toastr.success('Sửa thành công','thông báo');
        })



    
  }

  file:File[]=[];
  onSelect(event:any) {
    console.log(event);
    this.file.push(...event.addedFiles);
  }
  
  onRemove(event:any) {
    console.log(event);
    this.file.splice(this.file.indexOf(event), 1);
  }
}
