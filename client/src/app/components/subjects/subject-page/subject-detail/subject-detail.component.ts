import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ComponentCanDeactivate } from '../../../../guards/exit.subject-detail-page.guard';
import { Observable } from "rxjs";

import { SubjectsTableService } from '../../../../common/services/subjects/subjects-table.service';
import { StudentsTableService } from '../../../../common/services/students/students-table.service';
import { SubjectInfoService } from '../../../../common/services/subjects/subject-info.service';

import { Subject } from '../../../../common/entities/subject';
import { Teacher } from '../../../../common/entities/teacher';
import { Student } from '../../../../common/entities/student';

import { Mark } from '../../../../common/entities/mark';

import { ModalContentComponent } from '../../../../shared/components/modal-content/modal-content.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  providers: [
    SubjectsTableService,
    StudentsTableService,
    SubjectInfoService
  ],
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

  teacherTitle: string;
  itemSelected: string = "";

  subjectName: string;
  teacherId: string;
  newTeacherId: string;

  subject: Subject;
  teacher: Teacher;
  students: Student[] = [];
  dates: string[] = [];

  constructor(
    private subjectsTableService: SubjectsTableService,
    private studentsTableService: StudentsTableService,
    private subjectInfoService: SubjectInfoService,
    private activateRoute: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.teacherId = activateRoute.snapshot.params['teacherId'];
    this.newTeacherId = activateRoute.snapshot.params['teacherId'];
    this.subjectName = activateRoute.snapshot.params['subjectName'];
  }

  ngOnInit() {
    this.getTeacher(this.teacherId);
    this.getSubject(this.subjectName);
  }

  ngAfterViewChecked() {
    if (this.bsModalRef &&
      this.itemSelected !== this.bsModalRef.content.itemSelected &&
      this.bsModalRef.content.itemSelected) {
      Promise.resolve(null).then((value) => {
        let teacherSelected = this.bsModalRef.content.itemSelected;
        this.itemSelected = teacherSelected;
        this.teacherTitle = teacherSelected.split(" (id:")[0];
        let newTeacherId = teacherSelected.split(" (id: ")[1];
        this.newTeacherId = newTeacherId.split(")")[0];
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
    } else {
      return true;
    }
  }

  getTeacher(teacherId: string): void {
    this.subjectsTableService.getTeacherById(teacherId)
      .subscribe((teacher: Teacher) => {
        this.teacher = teacher;
        this.teacherTitle = `${teacher.name} ${teacher.lastName}`;
      });
  }

  getSubject(subjectName: string): void {
    this.subjectsTableService.getSubjectByName(subjectName)
      .subscribe((subject: Subject) => {
        this.subject = subject;
        this.getStudentsBySubjectAndTeacher(this.teacherId, subject._id);
      });
  }

  getStudentsBySubjectAndTeacher(
    teacherId: string,
    subjectId: string
  ): void {
    this.studentsTableService
      .getStudentsBySubjectAndTeacher(teacherId, subjectId)
      .subscribe((students: Student[]) => {
        this.students = students;
        this.getDates(students, teacherId, subjectId);
      });
  }

  getDates(
    students: Student[],
    teacherId: string,
    subjectId: string
  ): void {
    this.dates = this.subjectInfoService
      .getDates(students, teacherId, subjectId);
  }

  getStudentMarks(studentId: string): number[] {
    return this.subjectInfoService
      .getStudentMarks(studentId, this.subject._id, this.teacherId, this.students);
  }

  getMark(studentId: string, date: string): number | string {
    return this.subjectInfoService
      .getMark(studentId, date, this.subject._id, this.teacherId, this.students);
  }

  addColumn(): void {
    if (this.dates[this.dates.length - 1]) {
      this.students = this.students
        .map(student => {
          const newStudent = student;

          newStudent.academicPerformance
            .map(studentInfo => {
              const newStudentInfo = studentInfo;
              if (studentInfo.subjectId === this.subject._id
                && studentInfo.teacherId === this.teacherId) {
                newStudentInfo.marks.push(new Mark("", NaN))
              }
              return newStudentInfo;
            });

          return newStudent;
        })

      this.getDates(this.students, this.teacherId, this.subject._id);
    }

    this.visibilitySaveButton = true;
  }

  onChangedDate(value: string, count: number) {
    if (!this.dates.includes(value) && value) {
      const oldDate: string = this.dates[count];
      this.students = this.students.map(student => {
        const newStudent = student;

        newStudent.academicPerformance
          .map(studentInfo => {
            const newStudentInfo = studentInfo;
            if (studentInfo.subjectId === this.subject._id
              && studentInfo.teacherId === this.teacherId) {

              studentInfo.marks.map(mark => {
                const newMark = mark;
                if (mark.date === oldDate) {
                  newMark.date = value;
                  this.visibilitySaveButton = true;
                }
                return newMark;
              });

            }
            return newStudentInfo;
          });

        return newStudent;
      });
      this.getDates(this.students, this.teacherId, this.subject._id);
    }
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

  saveContent($event: any, date: string, studentId: string): void {
    let markValue: number;
    $event.target.innerText ? markValue = +$event.target.innerText : markValue = NaN;
    if (markValue) $event.target.innerText = markValue;
    if (!markValue) $event.target.innerText = "";
    const studentIncludeDate: boolean = this.students
      .find(student => student._id === studentId)
      .academicPerformance
      .find(studentInfo => studentInfo.subjectId === this.subject._id
        && studentInfo.teacherId === this.teacherId)
      .marks
      .some(mark => mark.date === date);
    if (!studentIncludeDate) this.addDate(date, studentId);

    this.students = this.students.map(student => {
      let newStudent: Student = student;

      if (student._id === studentId) {
        newStudent.academicPerformance
          .map(studentInfo => {
            const newStudentInfo = studentInfo;
            if (studentInfo.subjectId === this.subject._id
              && studentInfo.teacherId === this.teacherId) {

              studentInfo.marks.map(mark => {
                const newMark = mark;
                if (mark.date === date) {
                  newMark.value = markValue;
                  this.visibilitySaveButton = true;
                }
                return newMark;
              });

            }
            return newStudentInfo;
          });
      }

      return newStudent;
    });
    this.getDates(this.students, this.teacherId, this.subject._id);
  }

  addDate(date: string, studentId: string): void {
    this.students
      .find(student => student._id === studentId)
      .academicPerformance
      .find(studentInfo => studentInfo.subjectId === this.subject._id
        && studentInfo.teacherId === this.teacherId)
      .marks
      .push(new Mark(date, NaN));
  }

  openModalWithComponent() {
    const teachersIdBySubject: string[] = this.subject.teachersID;
    this.subjectsTableService
      .getTeachersFromOtherSubject(teachersIdBySubject)
      .subscribe((teachers: Teacher[]) => {
        const listNameTeachers = teachers.map(teacher => `${teacher.name} ${teacher.lastName} (id: ${teacher._id})`);
        const initialState = {
          list: listNameTeachers,
          title: 'Choose a new teacher:',
          itemSelected: ''
        };
        this.bsModalRef = this.modalService.show(ModalContentComponent, { initialState });
        this.bsModalRef.content.closeBtnName = 'Close';
      });
  }

  saveChanges() {
    if (this.dates.includes("")) {
      this.templateModalComponent.openModal();
    } else {
      const students = this.students.map(student => {
        student.academicPerformance
          .map(studentInfo => {

            if (studentInfo.subjectId === this.subject._id
              && studentInfo.teacherId === this.teacherId) {
              studentInfo.teacherId = this.newTeacherId;
            }
            return studentInfo;
          });

        return student;
      });

      this.subjectsTableService
        .saveChanges(
          this.teacherId,
          this.newTeacherId,
          this.subject,
          students);
      this.saved = true;
      alert("Changes saved successfully!");
      this.router.navigate([`subjects`]);
      this.visibilitySaveButton = false;
      this.saved = false;
    }
  }
}
