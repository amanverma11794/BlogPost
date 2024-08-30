import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostDetailList } from '../Classes/PostDetailsList';
import swal from 'sweetalert';
import { SharedServiceService } from '../SharedServices/shared-service.service';

@Component({
  selector: 'app-create-new-post',
  templateUrl: './create-new-post.component.html',
  styleUrl: './create-new-post.component.scss',
  
})
export class CreateNewPostComponent {
  postForm!: FormGroup;
  formSubmitted: boolean;
  SubmitText: string = 'Submit';
  isDisabled: boolean = false;
  @Input() userInputData!: PostDetailList;
  @Output() isBackToList: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private route: Router, private sharedService: SharedServiceService) {
    this.formSubmitted = false;
  }
  ngOnInit() {
    if (!this.userInputData?.id) {
      this.SubmitText = 'Submit';
      this.postForm = new FormGroup({
        userName: new FormControl('', [Validators.required,]),
        postDetails: new FormControl('', [Validators.required])
      });
    }
    else {
      this.SubmitText = 'Update';
      this.postForm = new FormGroup({
        userName: new FormControl(this.userInputData.userName, [Validators.required,]),
        postDetails: new FormControl(this.userInputData.blogDetails, [Validators.required]),
        
      });
    }
    
    console.log(this.userInputData);
  }

  onSubmit() {
    this.formSubmitted = true;
      this.postForm.patchValue({
        userName: this.postForm.get('userName')?.value.trim(),
        postDetails: this.postForm.get('postDetails')?.value.trim()
      });
    var postid = this.userInputData?.id == null ? '0' : this.userInputData?.id;
    if (this.postForm.valid) {
      var newobj = {
        Id: postid,
        Username: this.postForm.get('userName')?.value == null ? '' : this.postForm.get('userName')?.value,
        DateCreated:"vvv",
        Text: this.postForm.get('postDetails')?.value == null ? '' : this.postForm.get('postDetails')?.value
      };
      this.isDisabled = true;
      this.sharedService.createNewPost(newobj).subscribe((data) => {
        this.isDisabled = false;
        if (postid == '0') {
          swal("Success!", "Created succesfully", "success");
          this.isBackToList.emit(true);
        }
        else {
          swal("Success!", "Updated succesfully.", "success");
          this.isBackToList.emit(true);
        }
      },
        (error) => {
          this.isDisabled = false;
          swal("Failed!", "Something went wrong", "error");
        })
      

    } else {
      
      console.log('Form is invalid');
    }
  }
  onBackToList() {
    //alert('called')
    this.isBackToList.emit(true);
    //this.route.navigate(['./blogdetails']);
  }
 
}
