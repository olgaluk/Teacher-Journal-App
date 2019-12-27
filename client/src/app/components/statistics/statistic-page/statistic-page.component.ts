import { Component } from '@angular/core';

import { paths } from '../../../common/constants/paths';

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss']
})
export class StatisticPageComponent {
  routerLinks: string[] = [
    `/${paths.statisticStudents}`,
    `/${paths.statistic}`,
  ];
}
