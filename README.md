# Angular Project Overview
This Angular project demonstrates core concepts of component-based architecture, content projection, templating, directives, and event-driven communication. It illustrates foundational Angular techniques useful for building dynamic and maintainable UI applications.

## 1. Module Configuration and Bootstrapping (app.module.ts)
### Conceptual Overview
The root module configures the Angular application by declaring components, importing required Angular modules, and bootstrapping the root component. This module defines the scope and dependencies for the application, enabling Angular’s compilation and dependency injection systems.

### Implementation Details
The module declares components such as the root component and feature components, imports browser and common functionality modules, and bootstraps the root component. This setup initializes the Angular app and sets the foundation for component rendering.

## 2. Root Component Functionality (AppComponent)
### Conceptual Overview
The root component controls the main view and application state. Angular lifecycle hooks like ngAfterViewInit() provide access to child components and templates once the view is initialized. Reactive programming through observables and event emitters facilitates component communication and state management.

### Implementation Details
The root component maintains a list of course data displayed using child components. It employs @ViewChild and @ViewChildren decorators to query and interact with child components and templates dynamically after the view is rendered. Event handlers listen to emitted events from child components, enabling responsive UI behavior.

## 3. Content Projection and Content Queries (ng-content, ContentChild, ContentChildren)
### Conceptual Overview
Content projection allows parent components to insert custom content into child components, enabling flexible and reusable UI composition. Content queries provide programmatic access to projected elements and templates, facilitating dynamic behavior based on parent-supplied content.

### Implementation Details
The feature components use content projection to accept templates or markup such as course images and descriptions. Content queries retrieve references to this projected content, allowing components to manipulate or render it conditionally.

## 4. Template Instantiation and View Queries (ng-template, TemplateRef, ViewChild)
### Conceptual Overview
ng-template defines reusable, non-rendered template fragments that can be instantiated dynamically. TemplateRef represents references to these templates, and *ngTemplateOutlet inserts them into the DOM. View queries like @ViewChild access child components and templates within the component's own view.

### Implementation Details
Templates such as fallback content are defined using ng-template and instantiated via *ngTemplateOutlet. View queries locate these templates and child components, enabling dynamic rendering and interaction after the view is initialized.

## 5. Structural Directives (*ngIf, *ngFor, Deferred Loading, Conditional Rendering)
### Conceptual Overview
Structural directives control DOM structure by adding, removing, or iterating over elements based on application state. Conditional rendering and deferred loading optimize UI responsiveness and performance.

### Implementation Details
Conditional directives ensure elements such as course cards and images render only when relevant data exists. Iteration directives display lists of courses. Conditional logic implements fallback UI elements and optimized rendering paths.

## 6. Attribute Directives (NgClass, NgStyle)
### Conceptual Overview
Attribute directives dynamically modify element classes and styles based on component state or logic. This facilitates responsive design and dynamic styling without manual DOM manipulation.

### Implementation Details
Components apply dynamic CSS classes and inline styles to reflect course difficulty levels and other states. Multiple classes and style properties are applied conditionally using Angular binding syntax.

## 7. Logical Grouping (ng-container)
### Conceptual Overview
ng-container groups elements logically without rendering an actual DOM node. This avoids unnecessary wrappers while applying structural directives to multiple elements.

### Implementation Details
Logical grouping organizes conditional blocks and projected content cleanly, ensuring semantic and optimized DOM output.

## 8. Conditional Rendering with ngSwitch
### Conceptual Overview
ngSwitch renders different elements based on the value of an expression, simplifying multiple exclusive conditions.

### Implementation Details
Category-specific badges and UI variations render through *ngSwitchCase blocks, providing maintainable conditional rendering of course categories.

## 9. Event Handling and Component Communication
### Conceptual Overview
Angular enables communication between components via input bindings and output events. Child components emit events that parents subscribe to for reactive interaction.

### Implementation Details
Child components emit events on user interaction, such as when a course is viewed. The root component listens and responds to these events, facilitating coordinated UI behavior and data flow.

## 10. Dedicated Course Image Component
### Conceptual Overview
Encapsulating image rendering in a dedicated component promotes separation of concerns and reusability, simplifying parent component templates.

### Implementation Details
The image component displays course images with support for fallback content. It accepts inputs for image URLs and projected templates, integrating with content projection and dynamic templates to render image-related UI elements.

## Summary
This project exemplifies core Angular patterns including modular configuration, component lifecycle management, template-driven UI composition, reactive event handling, and dynamic styling. It demonstrates how to build flexible, maintainable interfaces with powerful Angular features like content projection, structural and attribute directives, and component communication.


# Usage Notes
## Adding or Modifying Courses
- The course data list is maintained in the root component (AppComponent). To add or update courses, modify the array holding course objects, each with properties such as title, description, category, and imageUrl.
- The root component uses *ngFor to render a CourseCardComponent for each course, automatically reflecting changes in the list.
- When adding courses, ensure the image URLs are valid or provide fallback templates within the CourseImageComponent.

## Customizing Templates and Content Projection
- CourseCardComponent and CourseImageComponent use content projection (<ng-content>) to allow injecting custom markup like descriptions or overlays.
- To customize how a course’s image or details appear, supply alternate templates or elements inside the course card’s usage in the root component template.
- Use ng-template to define reusable templates and pass them as projected content where needed.

Example:

```html
<app-course-card [course]="course">
  <ng-template #customDescription>
    <p>Custom description for {{ course.title }}</p>
  </ng-template>
</app-course-card>
```

## Handling Events
- Child components emit events such as courseViewed or courseSelected to notify the root component of user actions.
- Use Angular’s event binding syntax ((eventName)="handler($event)") to subscribe to these events in the root component template.
- In the root component’s TypeScript, define handlers to update state or trigger side effects like logging or navigation.

Example:

```html
<app-course-card
  *ngFor="let course of courses"
  [course]="course"
  (courseViewed)="onCourseViewed($event)">
</app-course-card>
```

```ts
onCourseViewed(course) {
  console.log('Viewed course:', course.title);
  // Additional logic here
}
```

## Using Structural and Attribute Directives
- Structural directives like *ngIf and *ngFor control what is rendered based on course data availability and filtering conditions.
- Attribute directives NgClass and NgStyle dynamically update styles according to course properties (e.g., difficulty or category).
- Modify or extend these bindings inside CourseCardComponent or the root component to change styling or conditional rendering logic.

# Diagrams

## Component Hierarchy

AppComponent
│
├── CourseCardComponent (multiple via *ngFor)
│     ├── CourseImageComponent
│     └── Projected Content (via ng-content)
│
└── Other possible components/templates

## Data and Event Flow

[AppComponent]
   |
   |-- passes course data --> [CourseCardComponent]
   |                              |
   |                              |-- passes image URL --> [CourseImageComponent]
   |                              |
   |                              |-- emits event (e.g. courseViewed) -- back --> [AppComponent]
   |
   |-- listens to events and updates UI/state

## Content Projection and Template Querying

[AppComponent Template]
   |
   |-- <app-course-card>
          |
          |-- <ng-content>  <-- projected content (custom templates or markup)
          |
          |-- queries projected content using ContentChild/ContentChildren
