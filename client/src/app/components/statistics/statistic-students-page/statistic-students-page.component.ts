import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../common/services/data.service';

@Component({
  selector: 'app-statistic-students-page',
  templateUrl: './statistic-students-page.component.html',
  styleUrls: ['./statistic-students-page.component.scss']
})
export class StatisticStudentsPageComponent implements OnInit {
  visibilityRatingButton: boolean = false;
  students: any;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.students = this.dataService.getDataAllStudentMarks();
  }

  changeVisibilityRating() {
    this.visibilityRatingButton = !this.visibilityRatingButton;
  }
}
