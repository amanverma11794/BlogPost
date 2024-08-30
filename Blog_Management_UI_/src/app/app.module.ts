import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogPostDetailsComponent } from './blog-post-details/blog-post-details.component';
import { CreateNewPostComponent } from './create-new-post/create-new-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedServiceService } from './SharedServices/shared-service.service';
import { HttpClientModule } from '@angular/common/http';
/*import { PostDetailList } from './Classes/PostDetailsList';*/


@NgModule({
  declarations: [
    AppComponent,
    BlogPostDetailsComponent,
    CreateNewPostComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SharedServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
