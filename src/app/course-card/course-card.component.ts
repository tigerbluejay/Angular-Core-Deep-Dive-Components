import { Component, Input, OnInit, EventEmitter, Output, ContentChild, AfterViewInit, ElementRef, ContentChildren, AfterContentInit, QueryList} from '@angular/core';
import { CommonModule } from '@angular/common';
import { COURSES } from '../../db-data';
import { Course } from '../model/course';
import { CourseImageComponent } from '../course-image/course-image.component';

@Component({
  // selector defines what the html tag is for this component
  selector: 'course-card',
  standalone: true,
  imports: [CommonModule],
  // points to the template file
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})

// AfterViewInit and AfterContentInit are interfaces which implement methods that serve
// to visualize content at the earliest possible time - these methods are also 
// called lifecycle hooks
export class CourseCardComponent implements OnInit, AfterViewInit, AfterContentInit {

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
    required: false
  })
  index: number;

  @Input()
  cardIndex: number;


  @Output('courseSelected')
  // we emit the custom event courseSelected
  // which is defined in the parent app component
  // we pass a parameter of an instance of Course
  courseEmitter = new EventEmitter<Course>();

  // CONTENT CHILD AND CONTENT CHILDREN
  // This is exactly like @ViewChild but the query 
  // covers only the projected content. That is content
  // that is projected from the parent template and captured
  // by the child template with the ng-content tag
  // So ContentChild queries the ng-content content
  // @ContentChild('courseImage')
  // image;
  // @ContentChild(CourseImageComponent, {read: ElementRef})
  // image: ElementRef;
  // we could query three images in one go with the ContentChildren decorator
  // the second parameter read: ElementRef is to grab not the component but the
  // DOM element
  @ContentChildren(CourseImageComponent, {read: ElementRef})
  images: QueryList<CourseImageComponent>;

  constructor() {}
  // the earliest possible moment when contentChild and 
  // contentChildren are loaded
  ngAfterContentInit(): void {
    console.log(this.images);
  }

  ngAfterViewInit() {
    // console.log(this.images);
  }

  ngOnInit(){}

  onCourseViewed(){
    console.log("card component - button clicked ");
    // with this line we emit the event which will
    // be caught at the parent level (in the app.component)
    this.courseEmitter.emit(this.course);
  }

  isImageVisible(){
    return this.course && this.course.iconUrl;
  }

  // this method called by ngClass returns a configuration
  // object with the names of classes and whether they are
  // applied or not. it could have also returned a string or
  // an array of strings as noted in the html file comments.
  // cardClasses(){
  //   return {
  //     // 'beginner': false, 
  //     // 'course-card': true
  //     'beginner': this.course.category == 'BEGINNER'
  //   };
  // OR WE COULD ALSO DO
  cardClasses() {
    if (this.course.category == 'BEGINNER'){
      return ['beginner'];
    }
  }
  // returning a string or an array of strings.
  // cardStyles() {
  //   return {'text-decoration': 'underline'};
  // }
  // but the point of passing a function is to
  // apply styles based on a condition dependent on
  // the data
  cardStyles(){
    return {
      'background-image': 'url(' + this.course.iconUrl +')'
    };
  }
}