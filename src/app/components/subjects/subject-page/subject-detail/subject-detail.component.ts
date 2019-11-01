import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { DataService } from '../../../../common/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ComponentCanDeactivate } from '../../../../guards/exit.subject-detail-page.guard';
import { Observable } from "rxjs";

import { Subject } from '../../../../common/entities/subject';
import { Teacher } from '../../../../common/entities/teacher';
import { Student } from '../../../../common/entities/student';
import { StudentNameAndMarks } from '../../../../common/entities/student-name-mark';

import { ModalContentComponent } from '../../../../shared/components/modal-content/modal-content.component';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit, AfterViewChecked, ComponentCanDeactivate {
  saved: boolean = false;

  bsModalRef: BsModalRef;

  subject: string;
  idTeacher: string;
  subjectInfo: Subject;
  teacher: Teacher;
  students: StudentNameAndMarks[] = [];
  dates: string[] = [];
  buttonInfo: string = "Back to subject list";

  visibilitySaveButton: boolean = false;

  markRegExp: any = /^[0-9]+$/;
  dateRegExp: any = /^[0-9\/]+$/;

  teacherTitle: string;
  itemSelected: string = "";

  constructor(
    private dataService: DataService,
    private activateRoute: ActivatedRoute,
    private modalService: BsModalService
  ) {
    this.idTeacher = activateRoute.snapshot.params['teacherId'];
    this.subject = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getTeacher(this.idTeacher);
    this.getSubjectInfo(this.subject);
    this.getStudentsFromTeacher(this.idTeacher, this.subject);
  }

  ngAfterViewChecked() {
    if (this.bsModalRef &&
      this.itemSelected !== this.bsModalRef.content.itemSelected &&
      this.bsModalRef.content.itemSelected) {
      Promise.resolve(null).then((value) => {
        let teacherSelected = this.bsModalRef.content.itemSelected;
        this.itemSelected = teacherSelected;
        this.teacherTitle = teacherSelected.split(" (id:")[0];
        this.visibilitySaveButton = true;
      })
    }
  }

  canDeactivate(): boolean | Observable<boolean> {

    if (!this.saved && this.visibilitySaveButton) {
      return confirm(
        `If you leave the page without saving the changes, they will be lost. 
      Are you sure you want to leave the page without saving the changes?`
      );
    }
    else {
      return true;
    }
  }

  getTeacher(idTeacher: string): void {
    this.teacher = this.dataService.getDataTeacher(idTeacher);
    this.teacherTitle = `${this.teacher.teacherName} ${this.teacher.teacherLastName}`;
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

  addColumn(): void {
    this.dates.push("");
    this.visibilitySaveButton = true;
  }

  checkContent($event: any, count: number) {
    this.visibilitySaveButton = true;
    if (!this.markRegExp.test($event.target.innerText)) {
      $event.target.innerText = $event.target.innerText.replace(/[^0-9]+/g, '');;
    } else if (+$event.target.innerText === 10) {
      $event.target.innerText = $event.target.innerText.slice(0, 2);
    } else if (+$event.target.innerText > 10 && +$event.target.innerText !== 10) {
      $event.target.innerText = $event.target.innerText.slice(0, 1);
    }
  }

  saveContent($event: any, count: number) {
  }

  openModalWithComponent() {
    const teachersInThisSubject: string[] = this.subjectInfo.teachersID;
    const teachersExceptThisSubject: Teacher[] = this.dataService.getTeachersExceptThisSubject(teachersInThisSubject);
    const listNameTeachers = teachersExceptThisSubject.map(teacher => `${teacher.teacherName} ${teacher.teacherLastName} (id: ${teacher.id})`);
    const initialState = {
      list: listNameTeachers,
      title: 'Choose a new teacher:',
      itemSelected: ''
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  onChangedDate(value: string, count: number) {
    if (!this.dates.includes(value) && value) {
      this.dates[count] = value;
    }
  }

  saveChanges() {
    this.dataService.addColumnForDate(this.idTeacher, this.subject, this.dates);
    this.getDates(this.students);
    this.saved = true;
  }
}
