import { CanDeactivate } from "@angular/router";

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean;
}

export class ExitSubjectDetailPageGuard implements CanDeactivate<ComponentCanDeactivate>{

  canDeactivate(component: ComponentCanDeactivate): boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}