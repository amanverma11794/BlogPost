import { Component, Input, OnInit, input } from '@angular/core';
import { PostDetailList } from '../Classes/PostDetailsList';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { SharedServiceService } from '../SharedServices/shared-service.service';

@Component({
  selector: 'app-blog-post-details',
  templateUrl: './blog-post-details.component.html',
  styleUrl: './blog-post-details.component.scss'
})
export class BlogPostDetailsComponent implements OnInit {
  PostDetailListData: Array<PostDetailList> = [];
  PostDetailTempData: Array<PostDetailList> = [];
  isList: boolean = true;
  isCreate: boolean = true;
  isEdit: boolean = true;
  userData: PostDetailList;
  arrayOfObjects: any[] = [];
  searchTerm: string = '';

  
  constructor(private route: Router, private sharedService: SharedServiceService) {
    this.PostDetailListData = new Array<PostDetailList>();
    this.userData = new PostDetailList();
  }
  ngOnInit(): void {
    this.isCreate = false;
    this.isEdit = false;
    this.isList = true;
    this.getPostDetails();
  }

  getPostDetails() {
    this.searchTerm = '';
    this.sharedService.getPostsList().subscribe((data) => {

      console.log(data);

      this.arrayOfObjects = data;
      this.PostDetailListData = [];
      for (var i = 0; i < this.arrayOfObjects.length; i++) {
        var d = this.arrayOfObjects[i];
        this.PostDetailListData.push({ id: d.id, blogDetails: d.text, userName: d.username, createdDate: d.dateCreated });
      }
      this.PostDetailTempData = this.PostDetailListData;
    },
      (error) => {

      });
  }
  onEdit(id: number) {
    this.isCreate = false;
    this.isEdit = true;
    this.isList = false;
    this.userData = this.PostDetailListData.filter(m => m.id == id)[0];
    
    
    //this.route.navigate(['./createblogs']);
  }

  newBlog() {
    this.isCreate = true;
    this.isEdit = false;
    this.isList = false;
    //this.route.navigate(['./createblogs']);
  }

  deleteBlog(id:any) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: [true, "Delete"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Blog post has been deleted!", {
            icon: "success",
          });
          this.sharedService.deletePostItems(id).subscribe((data) => {
            this.getPostDetails();
          },
            (error) => {
              swal("Failed!", "Something went wrong", "error");
            });
        } else {
          swal("Blog post is safe!");
        }
      });
  }
  getDataFromChild(eventVal: any) {
    
    this.isCreate = false;
    this.isEdit = false;
    this.isList = true;
    this.getPostDetails();
  }

  filterData() {
    this.PostDetailListData = this.PostDetailTempData;
    if (this.searchTerm != '') {
      this.PostDetailListData = this.PostDetailTempData.filter(item => item.blogDetails.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
  }
}
