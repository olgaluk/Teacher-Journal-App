import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { DataService } from '../../../../common/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ComponentCanDeactivate } from '../../../../guards/exit.subject-detail-page.guard';
import { Observable } from "rxjs";

import { Subject } from '../../../../common/entities/subject';
import { Teacher } from '../../../../common/entities/teacher';
import { Student } from '../../../../common/entities/student';

import { StudentMark } from '../../../../common/entities/student-mark';
import { Mark } from '../../../../common/entities/mark';

import { ModalContentComponent } from '../../../../shared/components/modal-content/modal-content.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit, AfterViewChecked, ComponentCanDeactivate {
  @ViewChild(ModalComponent, { static: false })
  private templateModalComponent: ModalComponent;

  saved: boolean = false;

  bsModalRef: BsModalRef;
  visibilitySaveButton: boolean = false;
  buttonInfo: string = "Back to subject list";
  markRegExp: any = /^[0-9]+$/;
  dateRegExp: any = /^[0-9\/]+$/;

  teacherTitle: string;
  itemSelected: string = "";

  subject: string;
  idTeacher: string;
  newIdTeacher: string;

  studentsInfo: StudentMark[] = [];
  subjectInfo: Subject;
  teacher: Teacher;
  students: Student[] = [];
  dates: string[] = [];

  constructor(
    private dataService: DataService,
    private activateRoute: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.idTeacher = activateRoute.snapshot.params['teacherId'];
    this.newIdTeacher = activateRoute.snapshot.params['teacherId'];
    this.subject = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getTeacher(this.idTeacher);
    this.getSubjectInfo(this.subject);
    this.getStudentsById(this.studentsInfo);
    this.getDates(this.studentsInfo);
  }

  ngAfterViewChecked() {
    if (this.bsModalRef &&
      this.itemSelected !== this.bsModalRef.content.itemSelected &&
      this.bsModalRef.content.itemSelected) {
      Promise.resolve(null).then((value) => {
        let teacherSelected = this.bsModalRef.content.itemSelected;
        this.itemSelected = teacherSelected;
        this.teacherTitle = teacherSelected.split(" (id:")[0];
        this.newIdTeacher = teacherSelected.split(" (id: ")[1];
        this.newIdTeacher = this.newIdTeacher.split(")")[0];
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
    const teacherInfo: Teacher = this.dataService.getDataTeacher(idTeacher);
    this.teacher = teacherInfo;
    const studentsInfo = teacherInfo.subjects
      .find(subject => subject.name === this.subject).studentsInfo;
    this.studentsInfo = studentsInfo.map(studentInfo => {
      return {
        "studentId": studentInfo.studentId,
        "marks": studentInfo.marks.map(mark => mark)
      }
    })
    this.teacherTitle = `${this.teacher.teacherName} ${this.teacher.teacherLastName}`;
  }

  getSubjectInfo(subject: string): void {
    this.subjectInfo = this.dataService.getDataSubjectInfo(subject);
  }

  getStudentsById(studentsInfo: StudentMark[]) {
    this.students = studentsInfo.map(student => {
      return this.dataService.getDataStudent(student.studentId);
    })
  }

  getAverageMark(studentId: number): number {
    const student = this.studentsInfo
      .find(studentInfo => studentInfo.studentId === studentId);
    const studentMarks: number[] = student.marks
      .map(markInfo => markInfo.mark)
      .filter(mark => mark);
    return +((studentMarks
      .reduce((acc, mark) => acc + mark)
      / studentMarks.length)
      .toFixed(1));
  }

  getDates(studentsInfo: StudentMark[]) {
    let dates: string[] = studentsInfo
      .map(studentInfo => {
        return studentInfo.marks.map(mark => mark.date);
      })
      .reduce((acc, currentMarks) => acc.concat(currentMarks), []);
    dates = Array.from(new Set(dates));

    if (dates.includes("")) {
      dates.splice(dates.indexOf(""), 1);
      dates
        .sort((str1, str2) => +str1.split('/')[1] - +str2.split('/')[1]);
      dates.push("");
    } else {
      dates
        .sort((str1, str2) => +str1.split('/')[1] - +str2.split('/')[1]);
    }
    this.dates = dates;
  }

  getMark(studentId: number, date: string): number | string {
    const student = this.studentsInfo
      .find(studentInfo => studentInfo.studentId === studentId);
    const markInfo = student.marks.find(mark => mark.date === date);
    return markInfo ? markInfo.mark : "";
  }

  addColumn(): void {
    if (this.dates[this.dates.length - 1]) {
      this.studentsInfo = this.studentsInfo
        .map(studentInfo => {
          const student = studentInfo;
          student.marks.push(new Mark("", null));
          return student;
        })
      this.getDates(this.studentsInfo);
    }

    this.visibilitySaveButton = true;
  }

  checkContent($event: any) {
    this.visibilitySaveButton = true;
    if (!this.markRegExp.test($event.target.innerText)) {
      $event.target.innerText = $event.target.innerText.replace(/[^0-9]+/g, '');;
    } else if (+$event.target.innerText === 10) {
      $event.target.innerText = $event.target.innerText.slice(0, 2);
    } else if (+$event.target.innerText > 10 && +$event.target.innerText !== 10) {
      $event.target.innerText = $event.target.innerText.slice(0, 1);
    }
  }

  addDate(date: string, studentId: number): void {
    this.studentsInfo
      .forEach(studentInfo => {
        if (studentInfo.studentId === studentId) {
          studentInfo.marks.push(new Mark(date, null))
        }
      });
  }

  saveContent($event: any, date: string, studentId: number): void {
    let mark: number | null = null;
    $event.target.innerText ? mark = +$event.target.innerText : mark = null;
    $event.target.innerText = mark;
    const studentIncludeDate: boolean = this.studentsInfo
      .find(student => student.studentId === studentId)
      .marks
      .some(markInfo => markInfo.date === date);
    if (!studentIncludeDate) this.addDate(date, studentId);

    this.studentsInfo = this.studentsInfo.map(studentInfo => {
      let newStudentInfo: StudentMark = studentInfo;

      if (studentInfo.studentId === studentId) {
        const newMarks = studentInfo.marks.map(markInfo => {
          let newMarkInfo = markInfo;
          if (markInfo.date === date) {
            newMarkInfo.mark = mark;
          }
          return newMarkInfo;
        });

        newStudentInfo.marks = newMarks;
      }

      return newStudentInfo;
    });
    this.getDates(this.studentsInfo);
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
      const oldDate: string = this.dates[count];
      this.studentsInfo = this.studentsInfo.map(studentInfo => {
        let newStudentInfo: StudentMark = studentInfo;

        const newMarks = studentInfo.marks.map(markInfo => {
          let newMarkInfo = markInfo;
          if (markInfo.date === oldDate) {
            this.visibilitySaveButton = true;
            newMarkInfo.date = value;
          }
          return newMarkInfo;
        });

        newStudentInfo.marks = newMarks;
        return newStudentInfo;
      });
      this.getDates(this.studentsInfo);
    }
  }

  saveChanges() {
    if (this.dates.includes("")) {
      this.templateModalComponent.openModal();
    } else {
      this.dataService.addNewDateForMarks(
        this.idTeacher,
        this.newIdTeacher,
        this.subject,
        this.studentsInfo);
      this.saved = true;
      this.router.navigate(['subjects']);
    }
  }
}
