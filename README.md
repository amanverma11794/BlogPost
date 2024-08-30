# BlogManagement
Basically this project is intended to manage the blog, you can see the blogs list, create new blogs, edit the existing blog and also delete the blog.

##Setup_instructions
1.) First install .Net8 sdk framework, you can download the visual studio 2022 for this.
2.) Download the Node.js 20.12 from from official website of Node.js (https://nodejs.org/en/download/prebuilt-installer/current).
3.) Install Angular CLI version 17.3 using cli command (npm install -g @angular/cli@17.3).
4.) Open the command prompt and type (ng v) to check the Angular has been installed. check the version of Angular CLI and Node Js.

##How to run the application
1.) At first download both folder (Blog_Management_API and Blog_Management_UI_).
2.) Open Blog_Management_API sln file in Visual studio and run it.
3.) Open Blog_Management_UI_ folder in command prompt.
4.) Just install the NPM packages using CLI command (npm i)
5.) Compile the Blog_Management_UI code using CLI command (ng serve -o).
6.) Now all is set, you can run the application in your browser.

##Application Design information
1.) Followed the client server seperation approach.
2.) For Server side(API) used MVC architecture.
3.) Used RxJs for state management for Client Side.
4.) For data storage used the Json file.
5.) Used @Input and @Output for Component communication.

##How to perform the functionality
1.) Run both application UI and API, The first page will be open and it will diplay the list of blogs.
2.) There have a New button for creating the new post.
3.) click on New button.
4.) Enter the User Name and Text.
5.) Click on submit.
6.) Record will be added.
7.) Click on Edit button.
8.) Update the details.
9.) Click on Update button.
10.) Click on Delete.
11.) A Confirmation pop-up should be open.
12.) If you want to delete just confirm otherwise you can cancel it.
