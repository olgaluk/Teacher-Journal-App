import { Component, OnInit } from '@angular/core';
import { StudentsTableService } from '../../../common/services/students/students-table.service';

import { Student } from '../../../common/entities/student';

@Component({
  selector: 'app-statistic-students-page',
  templateUrl: './statistic-students-page.component.html',
  providers: [StudentsTableService],
  styleUrls: ['./statistic-students-page.component.scss']
})
export class StatisticStudentsPageComponent implements OnInit {
  visibilityRatingButton: boolean = false;
  students: Student[] = [];

  constructor(private studentsTableService: StudentsTableService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentsTableService.getStudents()
      .subscribe((students: Student[]) => this.students = students);
  }

  changeVisibilityRating() {
    this.visibilityRatingButton = !this.visibilityRatingButton;
  }
}
