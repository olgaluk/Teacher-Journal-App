import { Component } from '@angular/core';

import { paths } from '../../common/constants/paths';

@Component({
  selector: 'nav-app',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  routerLinks: string[] = [
    paths.main,
    paths.studentsTable,
    paths.subjectsTable,
    paths.statistic,
    paths.export,
  ];
}