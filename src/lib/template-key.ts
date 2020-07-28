export class TemplateKey {
    public readonly modules?: any[];
    constructor(...modules: any[]) {
        this.modules = modules;
    }
}