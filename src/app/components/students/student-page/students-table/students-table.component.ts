import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../common/services/data.service';

import { Student } from '../../../../common/entities/student';

@Component({
  selector: 'students-table-app',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements OnInit {

  students: Student[] = [];
  buttonInfo: string = "Add new student";

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.students = this.dataService.getDataStudents();
  }
}