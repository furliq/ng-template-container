import { Injectable, TemplateRef, ChangeDetectorRef, ComponentFactoryResolver, ɵcreateInjector as createInjector } from '@angular/core';
import { TemplateKey } from './template-key';
import { TemplateOutlet } from './template-outlet';
import { queueScheduler } from 'rxjs';

const ngInjectorDef = 'ɵinj';
type TemplateDict = { [key: string]: TemplateRef<any> };

@Injectable({ providedIn: 'root' })
export class TemplateService {
  private _templates: TemplateDict = {};
  private readonly _templateMap = new Map<Function, TemplateDict>();
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }
  get templates() {
    return this._templates;
  }

  localTemplates(templateKey?: TemplateKey) {
    if(!templateKey || !templateKey.modules || !templateKey.modules.length) {
      return this.templates;
    }
    const { modules } = templateKey;
    return Object.assign({}, ...modules.map(mod => {
      if (!this._templateMap.has(mod)) {
        this._templateMap.set(mod, {});
      }
      return this._templateMap.get(mod);
    }));
  }

  registerTemplates(templates, templateKey?: TemplateKey) {
    const mod = templateKey ? templateKey.modules.slice().pop() : undefined;
    this._templateMap.set(mod, templates);
    if(!mod) this._templates = templates;
  }

  loadTemplates(templateKey: TemplateKey) {
    const { modules } = templateKey;
    modules.slice(0, -1).forEach(m => this.loadTemplateOutletComponent(m));
  }

  loadTemplateOutletComponent(module: any) {
    const component = module[ngInjectorDef].providers.find(p => p.provide === TemplateOutlet).useValue;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const injector = createInjector(module);

    const componentRef = componentFactory.create(injector);
    const cdRef = componentRef.injector.get(ChangeDetectorRef);
    componentRef.onDestroy(() => queueScheduler.schedule(() => cdRef.detectChanges()));
    componentRef.destroy();
  }
}