import { Component } from '@angular/core';

@Component({
  selector: 'nav-app',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  routerLinks: string[] = [
    "/main",
    "/students",
    "/subjects",
    "/statistics",
    "/export"
  ];
}