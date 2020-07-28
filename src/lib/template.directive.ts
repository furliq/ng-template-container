import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({
  selector: '[templateRef]'
})
export class TemplateDirective {
  @Input() name: string;
  constructor(public templateRef: TemplateRef<any>) { }
}