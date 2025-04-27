import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { format, parse } from 'date-fns'
import { capitalizeWords, isValidDate, calculateCountdown } from './utils'
import { FitTextDirective } from './fit-text.directive'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, FitTextDirective],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title: string = ''
  date: string = ''

  inputTitle: string = ''
  inputDate: string = ''

  showTitle: boolean = false
  showDate: boolean = false

  displayDate: string = ''
  now: Date = new Date()

  ngOnInit() {
    this.loadSavedData()
    this.startCountdown()
  }

  private loadSavedData(): void {
    const savedTitle = localStorage.getItem('countdownTitle')
    const savedDate = localStorage.getItem('countdownDate')

    if (savedTitle && savedDate) {
      this.title = capitalizeWords(savedTitle)
      this.inputTitle = savedTitle
      this.inputDate = savedDate
      this.displayDate = savedDate
      this.showTitle = true
      this.showDate = true
      this.updateDuration()
    }
  }
  private startCountdown(): void {
    setInterval(() => {
      this.updateDuration()
    }, 1000)
  }

  onEnter(event: Event): void {
    if ((event as KeyboardEvent).key !== 'Enter') {
      return
    }

    if (!this.hasValidInput()) {
      return
    }

    try {
      const formattedDate = this.formatInputDate()
      if (this.isValidInputDate(formattedDate)) {
        this.saveInputData(formattedDate)
      } else {
        throw new Error('Invalid date')
      }
    } catch (error) {
      this.handleInvalidDate()
    }
  }

  private hasValidInput(): boolean {
    return this.inputTitle !== '' && this.inputDate !== ''
  }

  private formatInputDate(): string {
    const cleanDate = this.inputDate.replace(/\D/g, '')
    const parsedDate = parse(cleanDate, 'yyyyMMdd', new Date())
    return format(parsedDate, 'yyyy-MM-dd')
  }

  private isValidInputDate(formattedDate: string): boolean {
    const parsedDate = parse(formattedDate, 'yyyy-MM-dd', new Date())
    return isValidDate(parsedDate)
  }

  private saveInputData(formattedDate: string): void {
    this.title = this.inputTitle
    this.showTitle = true
    this.inputDate = formattedDate
    this.displayDate = formattedDate
    this.showDate = true
    this.updateDuration()

    localStorage.setItem('countdownTitle', this.title)
    localStorage.setItem('countdownDate', this.inputDate)
  }

  private handleInvalidDate(): void {
    alert('Please enter a valid date')
    this.inputDate = ''
    this.displayDate = ''
  }
  private updateDuration(): void {
    if (!this.displayDate) {
      return
    }

    const targetDate = parse(this.displayDate, 'yyyy-MM-dd', new Date())
    if (isValidDate(targetDate)) {
      this.date = calculateCountdown(targetDate)
    }
  }
}
