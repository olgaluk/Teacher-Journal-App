import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../common/services/data.service';
import { ActivatedRoute } from '@angular/router';

import { Subject } from '../../../../common/entities/subject';
import { Teacher } from '../../../../common/entities/teacher';
import { Student } from '../../../../common/entities/student';
import { StudentNameAndMarks } from '../../../../common/entities/student-name-mark';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit {
  subject: string;
  idTeacher: string;
  subjectInfo: Subject;
  teacher: Teacher;
  students: StudentNameAndMarks[] = [];
  dates: string[] = [];
  buttonInfo: string = "Back to subject list";

  constructor(private dataService: DataService, private activateRoute: ActivatedRoute) {
    this.idTeacher = activateRoute.snapshot.params['teacherId'];
    this.subject = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getTeacher(this.idTeacher);
    this.getSubjectInfo(this.subject);
    this.getStudentsFromTeacher(this.idTeacher, this.subject);
  }

  getTeacher(idTeacher: string): void {
    this.teacher = this.dataService.getDataTeacher(idTeacher);
  }

  getSubjectInfo(subject: string): void {
    this.subjectInfo = this.dataService.getDataSubjectInfo(subject);
  }

  getStudentsFromTeacher(idTeacher: string, subject: string): void {
    const students = this.dataService.getDataStudentsFromTeacher(idTeacher, subject);
    this.students = students;
    this.getDates(students);
  }

  getAverageMark(student: StudentNameAndMarks): number {
    return +((student.marks
      .map((markInfo) => markInfo.mark)
      .reduce((acc, mark) => acc + mark) / student.marks.length)
      .toFixed(1));
  }

  getDates(students: StudentNameAndMarks[]) {
    const dates = students
      .map(student => {
        return student.marks.map(mark => mark.date);
      })
      .reduce((acc, currentMarks) => acc.concat(currentMarks), []);
    this.dates = Array.from(new Set(dates));
  }

  getMark(student: StudentNameAndMarks, date: string): number | string {
    const mark = student.marks.find(mark => mark.date === date);
    return mark ? mark.mark : "";
  }
}
