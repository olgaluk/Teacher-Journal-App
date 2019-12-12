import { Component, OnInit } from '@angular/core';
import { HttpStudentService } from '../../../common/services/students/http-student.service';

import { Student } from '../../../common/entities/student';

@Component({
  selector: 'app-statistic-students-page',
  templateUrl: './statistic-students-page.component.html',
  styleUrls: ['./statistic-students-page.component.scss']
})
export class StatisticStudentsPageComponent implements OnInit {
  visibilityRatingButton: boolean = false;
  students: Student[] = [];

  constructor(private httpStudentService: HttpStudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.httpStudentService.getItems()
      .subscribe((students: Student[]) => this.students = students);
  }

  changeVisibilityRating() {
    this.visibilityRatingButton = !this.visibilityRatingButton;
  }
}
