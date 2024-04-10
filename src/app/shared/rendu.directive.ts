import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRendu]',
  standalone: true
})
export class RenduDirective {

  constructor(el:ElementRef) { 
    // modification du style CSS de l'élément du DOM qui a l'attribut appRendu
    el.nativeElement.style.color = 'green';
    //el.nativeElement.innerHTML += "HELLOOOOOOOOOOO";
  }

}
