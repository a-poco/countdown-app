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
    this.saveInputData()
  }

  private saveInputData(): void {
    if (this.inputTitle.trim() === '') {
      this.handleInvalidTitle()
      return
    }

    const yyyyMMddDate = this.inputDate.replace(/\D/g, '')
    const isDateValid = isValidDate(yyyyMMddDate)
    if (!isDateValid) {
      this.handleInvalidDate()
      return
    }

    const parsedDate = parse(yyyyMMddDate, 'yyyyMMdd', new Date())
    const formattedDate = format(parsedDate, 'yyyy-MM-dd')

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

  private handleInvalidTitle(): void {
    alert('Please enter a title')
    this.inputTitle = ''
  }

  private updateDuration(): void {
    if (!this.displayDate) {
      return
    }
    this.date = calculateCountdown(this.displayDate)
  }
}
