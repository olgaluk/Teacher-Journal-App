import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistic-students-page',
  templateUrl: './statistic-students-page.component.html',
  styleUrls: ['./statistic-students-page.component.scss']
})
export class StatisticStudentsPageComponent implements OnInit {
  visibilityRatingButton: boolean = false;
  students: any = [];

  constructor( ) { }

  ngOnInit() { }

  changeVisibilityRating() {
    this.visibilityRatingButton = !this.visibilityRatingButton;
  }
}
