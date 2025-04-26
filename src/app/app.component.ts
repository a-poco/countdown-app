import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { format, parse } from 'date-fns';
import { differenceInSeconds, formatDate } from 'date-fns';
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
  now = new Date();
  targetDate: Date | null = null;

  ngOnInit() {
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
        this.targetDate = parse(this.inputDate, 'yyyyMMdd', new Date());

        if (this.isValidDate(this.targetDate)) {
          this.title = this.inputTitle;
          this.showTitle = true;
          this.updateDuration();
          this.showDate = true;
          this.inputDate = formattedDate;
        } else {
          throw new Error('Invalid date');
        }
      } catch (error) {
        alert(
          'Please enter a valid date in YYYYMMDD format (e.g., 20241225 for December 25, 2024)'
        );
        this.inputDate = '';
      }
    }
  }

  private isValidDate(date: Date): boolean {
    return date instanceof Date;
  }

  private updateDuration() {
    if (this.targetDate) {
      const now = new Date();
      let totalSeconds = differenceInSeconds(this.targetDate, now);

      const days = Math.floor(totalSeconds / (3600 * 24));
      totalSeconds %= 3600 * 24;
      const hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      this.date = `${days}days, ${hours}h, ${minutes}m, ${seconds}s`;
    }
  }
}
