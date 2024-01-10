import { Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { COURSES } from '../../db-data';
import { Course } from '../model/course';

@Component({
  // selector defines what the html tag is for this component
  selector: 'course-card',
  standalone: true,
  imports: [CommonModule],
  // points to the template file
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnInit {

  // here we add the input property title
  // to the course-card
  @Input({
    // if we defined required:true
    // we´ll get a compilation error for
    // this component if we don´t pass an input
    required: true
  })
  // it can take as input a string
  // title:string;
  // or a whole object (from the model folder - see imports above)
  course:Course;

  @Input({
    required: true
  })
  index: number;


  @Output('courseSelected')
  // we emit the custom event courseSelected
  // which is defined in the parent app component
  // we pass a parameter of an instance of Course
  courseEmitter = new EventEmitter<Course>();

  constructor() {}

  ngOnInit(){}

  onCourseViewed(){
    console.log("card component - button clicked ");
    // with this line we emit the event which will
    // be caught at the parent level (in the app.component)
    this.courseEmitter.emit(this.course);
  }
}
