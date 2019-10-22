import { Component } from '@angular/core';

import { Student } from '../../../../common/entities/student';

import students from '../../../../../../data/students.json';

@Component({
  selector: 'students-table-app',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent {
  items: Student[] = students;
  condition: boolean = true;
  buttonInfo: string = "Add new student";

  toggle() {
    this.condition = !this.condition;
    this.buttonInfo === "Add new student" ? this.buttonInfo = "Back" : this.buttonInfo = "Add new student";
  }

  addItem(
    id: number,
    name: string,
    lastName: string,
    age: number,
    address: string
  ): void {
    if (name == null || lastName == null || name.trim() == "" || id == null || age == null)
      return;
    this.items.push(new Student(id, name, lastName, age, address));
  }
}