import {Component} from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
@Component({
  selector: 'app',
  template: '<router-outlet></router-outlet>'
})

export class AppComponent {
  title = 'SportStore';
}
