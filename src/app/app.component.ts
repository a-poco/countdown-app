import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { format, parse } from 'date-fns';
import { differenceInSeconds } from 'date-fns';
import { capitalizeWords } from './utils';
import { FitTextDirective } from './fit-text.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, FitTextDirective],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = '';
  inputTitle = '';
  showTitle = false;
  date = '';
  inputDate = '';
  showDate = false;
  now = new Date();

  ngOnInit() {
    const savedTitle = localStorage.getItem('countdownTitle');
    const savedDate = localStorage.getItem('countdownDate');

    if (savedTitle && savedDate) {
      this.title = capitalizeWords(savedTitle);
      this.inputTitle = savedTitle;
      this.inputDate = savedDate;
      this.showTitle = true;
      this.showDate = true;
      this.updateDuration();
    }

    setInterval(() => {
      this.updateDuration();
    }, 1000);
  }

  onEnter(event: Event) {
    if ((event as KeyboardEvent).key === 'Enter') {
      if (this.inputTitle === '' || this.inputDate === '') {
        return;
      }

      const parsedDate = parse(this.inputDate, 'yyyyMMdd', new Date());
      const formattedDate = format(parsedDate, 'yyyy-MM-dd');

      try {
        if (this.isValidDate(parsedDate)) {
          this.title = this.inputTitle;
          this.showTitle = true;
          this.inputDate = formattedDate;
          this.showDate = true;
          this.updateDuration();

          localStorage.setItem('countdownTitle', this.title);
          localStorage.setItem('countdownDate', this.inputDate);
        } else {
          throw new Error('Invalid date');
        }
      } catch (error) {
        alert('Please enter a valid date');
        this.inputDate = '';
      }
    }
  }

  private isValidDate(date: Date): boolean {
    const now = new Date();
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return false;
    }
    return date > now;
  }

  private updateDuration() {
    const targetDate = parse(this.inputDate, 'yyyy-MM-dd', new Date());
    if (this.isValidDate(targetDate)) {
      const now = new Date();
      let totalSeconds = differenceInSeconds(targetDate, now);

      const days = Math.floor(totalSeconds / (3600 * 24));
      totalSeconds %= 3600 * 24;
      const hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      this.date = `${days} days, ${hours}h, ${minutes}m, ${seconds}s`;
    }
  }
}
