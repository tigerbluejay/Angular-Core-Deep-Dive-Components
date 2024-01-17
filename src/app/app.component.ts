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

  courses = COURSES;

  startDate = new Date(2000, 0, 1);
  title = COURSES[0].description;
  price = 9.99777766666;
  rate = 0.67;
  course = COURSES[0];

  onCardClicked() {
    console.log("App component - click event bubbled...");
  }

  // here as a parameter we capture the Course that
  // has been emitted.
  onCourseSelected(course:Course) {
    console.log("App component - click event bubbled...", course);
  }
  // in cases where our data does not have a unique identifier like 'id'
  // we have to write a tracking function, which should return a unique identifier
  trackCourse(index:number, course:Course){
    return course.id;
  }
}
