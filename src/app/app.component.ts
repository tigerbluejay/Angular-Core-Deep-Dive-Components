import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import { CourseCardComponent } from './course-card/course-card.component';
import { withFetch } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    console.log(this.cards.first); // prints the first element of the collection - the first card on the list
    console.log(this.cards.last);

    // an observable "changes" native to the angular api
    // this observable is going to emit multiple values
    // over time as the collection gets modified
    // the anonymous function will be called whenever
    // a new value is emitted by changes
    // changes is only going to emit values when there
    // are changes to the collection
    // so for example if we add a new course to the end of the list
    // then the changes observable will emit new values and will call
    // the anonymous function.
    this.cards.changes.subscribe(
      cards => console.log(cards)
    );
  }

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

  // with the ViewChild decorator
  // Here we obtain at the app level component 
  // a reference to the course card child component
  // @ViewChild(CourseCardComponent)
  // card: CourseCardComponent;
  // We can also query by title reference on the course
  // card element, like so:
  // here we query a component
  @ViewChild('cardRef1')
  card1: CourseCardComponent;

  @ViewChild('cardRef2')
  card2: CourseCardComponent;

  // ElementRef is a type from angular core
  // that allows us to handle native dom elements
  // here we query a dom element
  @ViewChild('container')
  containerDiv: ElementRef;

  // here we query the course card dom element
  // and not the course card component
  @ViewChild('cardRef1', {read: ElementRef})
  card3: CourseCardComponent;

  // Know that if you have an image inside the course card element 
  // for example. You cannot query it using @ViewChild 
  // This is because it is a child of the child and it is not accessible.
  // We can only view the elements of the current template so in this case
  // a div defined in the app.component or the card component present also in
  // the app.component template 

  // With View Children we can query children Collections
  @ViewChildren(CourseCardComponent)
  cards: QueryList<CourseCardComponent>;

  // We can also query children elements referring to 
  // the dom element and not the component
  // @ViewChildren(ElementRef)
  // cards2: QueryList<ElementRef>;

  
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

  onCourseSelected2(course:Course){
    console.log(this.card1);
    console.log(this.card2);
    console.log("containerDiv", this.containerDiv);
    console.log(this.card3);
  }

  onCoursesEdited() {
    this.courses.push(
      {
        id: 11,
        description: "Title",
        iconUrl: "",
        longDescription: "Long Description",
        lessonCount: 10
      }
    )
  }
}

// We could have App component inherit from AfterViewInit class
// in order to access the ngAfterViewInit() method
// It is during this method that it is the earliest at which 
// we can access the variables we define in this class. 
// But it´s important not to modify these variables on this method 
// which again is a lifecycle hook that is called automatically and not 
// a method which we have to invoke 
// If we try to modify the values of the variables here we´ll run into an error
// To inherit we do 
// export class AppComponent implements AfterViewInit 
// and then the method we want is 
// ngAfterViewInit()
