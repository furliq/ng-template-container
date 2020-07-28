import { Component, ChangeDetectionStrategy, AfterContentInit, ContentChildren, QueryList } from "@angular/core";
import { TemplateService } from "./template.service";
import { TemplateDirective } from "./template.directive";
import { TemplateKey } from './template-key';

@Component({
  selector: 'template-container',
  template: `
    <template>
      <ng-content></ng-content>
    </template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateContainer implements AfterContentInit {

  @ContentChildren(TemplateDirective) contents: QueryList<TemplateDirective>;
  constructor(private templateService: TemplateService, private templateKey: TemplateKey) { }

  ngAfterContentInit() {
    const templates = this.contents.reduce((set, template) => Object.assign(set, { [template.name]: template.templateRef }), {});
    this.templateService.registerTemplates(templates, this.templateKey);
  }
}