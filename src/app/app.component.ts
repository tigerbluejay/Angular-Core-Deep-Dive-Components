import { Component } from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // COURSES is defined in db-data.ts
  // this information is now available
  // at the template level in app.component.html
  coreCourse = COURSES[0];
  rxjsCourse = COURSES[1];
  ngrxCourse = COURSES[2];  

  onCardClicked() {
    console.log("App component - click event bubbled...");
  }

  // here as a parameter we capture the Course that
  // has been emitted.
  onCourseSelected(course:Course) {
    console.log("App component - click event bubbled...", course);
  }

}
