import { Component } from '@angular/core';

import { Subject } from '../../../../common/entities/subject';
import subjects from '../../../../../../data/subjects.json';

@Component({
  selector: 'app-subjects-table',
  templateUrl: './subjects-table.component.html',
  styleUrls: ['./subjects-table.component.scss']
})
export class SubjectsTableComponent {

  items: Subject[] = subjects;
  condition: boolean = true;
  buttonInfo: string = "Add new subject";

  toggle() {
    this.condition = !this.condition;
    this.buttonInfo === "Add new subject" ? this.buttonInfo = "Back" : this.buttonInfo = "Add new subject";
  }

  addItem(
    subject: string,
    cabinet: number,
    description: string
  ): void {
    if (subject == null)
      return;
    this.items.push(new Subject(subject, cabinet, description));
  }
}
