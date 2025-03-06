import { Component } from '@angular/core';

@Component({
  selector: 'app-registracp-page',
  templateUrl: './registracp-page.component.html',
  styleUrls: ['./registrarcp-page.component.css']
})
export class RegistracpPageComponent {
  selectedOption: string = ''; // 'course' or 'activity'
  usersInCourse: string[] = []; // List of users for the course
  usersInActivity: string[] = []; // List of users for the activity

  // Function to toggle form based on the selected option
  selectOption(option: string) {
    this.selectedOption = option;
  }

  // Add user to the list for course or activity
  addUser(user: string) {
    if (this.selectedOption === 'course') {
      this.usersInCourse.push(user);
    } else if (this.selectedOption === 'activity') {
      this.usersInActivity.push(user);
    }
  }

  // Reset the form
  resetForm() {
    this.selectedOption = '';
    this.usersInCourse = [];
    this.usersInActivity = [];
  }
}