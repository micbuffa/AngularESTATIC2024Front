import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNonRendu]',
  standalone: true
})
export class NonRenduDirective {

  constructor(el:ElementRef) { 
    // modification du style CSS de l'élément du DOM qui a l'attribut appNonRendu
    el.nativeElement.style.color = 'red';
  }

}
