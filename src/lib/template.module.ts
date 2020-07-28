import { NgModule } from '@angular/core';
import { TemplateContainer } from './template-container.component';
import { TemplateDirective } from './template.directive';

@NgModule({
  declarations: [
    TemplateContainer, TemplateDirective
  ],
  exports: [TemplateContainer, TemplateDirective]
})
export class TemplateModule { }