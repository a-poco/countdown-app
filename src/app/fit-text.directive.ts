import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';

@Directive({ selector: '[fitText]' })
export class FitTextDirective implements AfterViewInit, OnDestroy {
  @HostListener('window:resize')
  onWindowResize() {
    this.resizeText();
  }

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.el.nativeElement.style.whiteSpace = 'nowrap';
    this.resizeText();
  }

  private resizeText() {
    const parent = this.el.nativeElement.parentElement;
    const element = this.el.nativeElement;
    if (!parent) return;

    let fontSize = 10;
    const maxSize = 512;
    element.style.fontSize = fontSize + 'px';

    while (fontSize < maxSize && element.scrollWidth <= parent.clientWidth) {
      fontSize++;
      element.style.fontSize = fontSize + 'px';
    }
    if (element.scrollWidth > parent.clientWidth) {
      fontSize--;
      element.style.fontSize = fontSize + 'px';
    }
  }

  ngOnDestroy() {}
}
