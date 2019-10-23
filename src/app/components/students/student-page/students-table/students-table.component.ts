import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../common/services/data.service';

import { Student } from '../../../../common/entities/student';

@Component({
  selector: 'students-table-app',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements OnInit {
  items: Student[] = [];
  condition: boolean = true;
  buttonInfo: string = "Add new student";

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.items = this.dataService.getDataStudents();
  }

  addItem(id: number,
    name: string,
    lastName: string,
    age: number,
    address: string): void {
    this.dataService.addDataStudent(id, name, lastName, age, address);
  }

  toggle(): void {
    this.condition = !this.condition;
    this.buttonInfo === "Add new student" ? this.buttonInfo = "Back" : this.buttonInfo = "Add new student";
  }
}