import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = '';
  inputTitle = '';
  showTitle = false;
  date = '';
  inputDate = '';
  showDate = false;
  onEnter(event: Event) {
    if ((event as KeyboardEvent).key === 'Enter') {
      if (this.inputTitle === '' || this.inputDate === '') {
        return;
      }
      this.title = this.inputTitle;
      this.showTitle = true;
      this.date = this.inputDate;
      this.showDate = true;
      this.inputTitle = '';
      this.inputDate = '';
    }
  }
}
