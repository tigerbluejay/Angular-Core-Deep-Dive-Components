import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'course-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-image.component.html',
  styleUrl: './course-image.component.css'
})
export class CourseImageComponent implements OnInit{
  
  // inside the input property parenthesis you
  // can specify an alternative name for the input
  @Input('src')
  imageUrl:string;
  
  constructor() {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



}
