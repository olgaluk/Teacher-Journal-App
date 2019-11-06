import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../common/services/http.service';

import { Student } from '../../../../common/entities/student';

@Component({
  selector: 'students-table-app',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements OnInit {

  students: Student[] = [];
  buttonInfo: string = "Add new student";

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.httpService.getStudents().subscribe((data: Student[]) => this.students = data);
  }
}