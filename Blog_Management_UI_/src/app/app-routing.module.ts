import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPostDetailsComponent } from './blog-post-details/blog-post-details.component';
import { CreateNewPostComponent } from './create-new-post/create-new-post.component';

const routes: Routes = [
  { path: '', redirectTo: 'blogdetails', pathMatch: 'full' },
  { path: 'blogdetails', component: BlogPostDetailsComponent },
  { path: 'createblogs', component: CreateNewPostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
