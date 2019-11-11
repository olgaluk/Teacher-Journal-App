import { Component, OnInit } from '@angular/core';
import { StudentsTableService } from '../../../../common/services/students-table.service';

import { Student } from '../../../../common/entities/student';

@Component({
  selector: 'students-table-app',
  templateUrl: './students-table.component.html',
  providers: [StudentsTableService],
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements OnInit {

  students: Student[] = [];
  buttonInfo: string = "Add new student";

  constructor(private studentsTableService: StudentsTableService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentsTableService.getStudents()
      .subscribe((students: Student[]) => this.students = students);
  }
}
