import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ComponentCanDeactivate } from '../../../../guards/exit.subject-detail-page.guard';
import { Observable } from "rxjs";

import { SubjectInfoService } from '../../../../common/services/subjects/subject-info.service';

import { Subject } from '../../../../common/entities/subject';
import { Teacher } from '../../../../common/entities/teacher';
import { Student } from '../../../../common/entities/student';
import { Mark } from '../../../../common/entities/mark';

import { ModalContentComponent } from '../../../../shared/components/modal-content/modal-content.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { NotificationSelfClosingComponent }
  from '../../../../shared/notifications/notification-self-closing/notification-self-closing.component';
import { MESSAGE_ABOUT_CHANGES } from '../../../../common/constants/message-about-changes';


import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/state/app.state';

import {
  GetTeachersFromOtherSubject,
  GetSelectedTeacher
} from '../../../../redux/store/actions/teacher.actions';
import { UpdateStudents, GetStudentsBySelectedSubject, ISubjectAndTeacherId } from '../../../../redux/store/actions/student.actions';
import {
  UpdateSubjectTeachersId,
  INewSubjectInfo,
  GetSelectedSubject
} from '../../../../redux/store/actions/subject.actions';

import {
  selectSelectedTeacher,
  selectTeachersFromOtherSubjects
} from '../../../../redux/store/selectors/teacher.selectors';
import { selectSelectedSubject } from '../../../../redux/store/selectors/subject.selectors';
import { selectStudentListBySubject } from '../../../../redux/store/selectors/student.selectors';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  providers: [
    SubjectInfoService
  ],
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit, AfterViewChecked, ComponentCanDeactivate {
  @ViewChild(ModalComponent, { static: false })
  private templateModalComponent: ModalComponent;

  @ViewChild(NotificationSelfClosingComponent, { static: false })
  private notification: NotificationSelfClosingComponent;

  saved: boolean = false;
  visibilitySaveButton: boolean = false;
  bsModalRef: BsModalRef;

  teacherTitle: string;
  itemSelected: string = "";

  teacher$: Observable<Teacher>;
  subject$: Observable<Subject>;
  students$: Observable<Student[]>;
  teacherId: string;
  newTeacherId: string;
  subjectName: string;
  dates: string[] = [];
  messageAboutChanges: string = MESSAGE_ABOUT_CHANGES;

  constructor(
    private _store: Store<IAppState>,
    private _subjectInfoService: SubjectInfoService,
    private modalService: BsModalService,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) {
    this.teacherId = _activateRoute.snapshot.params['teacherId'];
    this.newTeacherId = _activateRoute.snapshot.params['teacherId'];
    this.subjectName = _activateRoute.snapshot.params['subjectName'];

    this.teacher$ = _store.pipe(select(selectSelectedTeacher));
    this.subject$ = _store.pipe(select(selectSelectedSubject));
    this.students$ = _store.pipe(select(selectStudentListBySubject));
  }

  ngOnInit() {
    const subjectAndTeacherId: ISubjectAndTeacherId = {
      teacherId: this.teacherId,
      subjectName: this.subjectName,
    };
    this.getSubject();
    this.getTeacher();
    this.getStudentsBySubjectAndTeacher(subjectAndTeacherId);
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
      return confirm(this.messageAboutChanges);
    } else {
      return true;
    }
  }

  getTeacher(): void {
    this._store.dispatch(new GetSelectedTeacher(this.teacherId));
    this.teacher$.subscribe((teacher: Teacher) => {
      this.teacherId = teacher.id;
      this.newTeacherId = teacher.id;
      this.teacherTitle = `${teacher.name} ${teacher.lastName}`;
    });
  }

  getSubject(): void {
    this._store.dispatch(new GetSelectedSubject(this.subjectName));
  }

  getStudentsBySubjectAndTeacher(subjectAndTeacherId: ISubjectAndTeacherId): void {
    this._store.dispatch(new GetStudentsBySelectedSubject(subjectAndTeacherId));

    this.getDates(students, this.teacherId, this.subject._id);

  }

  getDates(
    students: Student[],
    teacherId: string,
    subjectId: string
  ): void {
    this.dates = this._subjectInfoService
      .getDates(students, teacherId, subjectId);
  }

  getMark(studentId: string, date: string): number | string {
    return this._subjectInfoService
      .getMark(studentId, date, this.subject._id, this.teacherId, this.students);
  }

  addColumn(): void {
    if (this.dates[this.dates.length - 1]) {
      this.students = this._subjectInfoService
        .addNewColumn(this.students, this.teacherId, this.subject._id);
      this.getDates(this.students, this.teacherId, this.subject._id);
    }
    this.visibilitySaveButton = true;
  }

  onChangedDate(value: string, count: number): void {
    if (!this.dates.includes(value) && value) {
      const oldDate: string = this.dates[count];
      this.students = this.students.map(student => {
        const newStudent = student;

        newStudent.academicPerformance
          .map(studentInfo => {
            const newStudentInfo = studentInfo;
            if (studentInfo.subjectId === this.subject._id
              && studentInfo.teacherId === this.teacherId) {

              newStudentInfo.marks = studentInfo.marks
                .map(mark => {
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

  saveContent(inputValue: string, date: string, studentId: string): void {
    let markValue: number;
    inputValue ? markValue = +inputValue : markValue = null;
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

              newStudentInfo.marks = studentInfo.marks.map(mark => {
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

  openModalWithComponent(): void {
    const teachersIdBySubject: string[] = this.subject.teachersID;
    this._store.dispatch(new GetTeachersFromOtherSubject(teachersIdBySubject));
    this._store
      .pipe(select(selectTeachersFromOtherSubjects))
      .subscribe((teachers: Teacher[]) => {
        const listNameTeachers = teachers
          .map(teacher => `${teacher.name} ${teacher.lastName} (id: ${teacher.id})`);
        const initialState = {
          list: listNameTeachers,
          title: 'Choose a new teacher:',
          itemSelected: ''
        };
        this.bsModalRef = this.modalService.show(ModalContentComponent, { initialState });
        this.bsModalRef.content.closeBtnName = 'Close';
      });
  }

  deleteEmptyMarks(): void {
    this.students = this.students.map(student => {
      student.academicPerformance
        .map(studentInfo => {

          if (studentInfo.subjectId === this.subject._id
            && studentInfo.teacherId === this.teacherId) {
            studentInfo.teacherId = this.newTeacherId;

            studentInfo.marks = studentInfo.marks
              .map(mark => {
                if (mark.value === null) {
                  return null;
                }
                return mark;
              })
              .filter(mark => mark);
          }
          return studentInfo;
        });

      return student;
    });
  }

  saveChanges(): void {
    if (this.dates.includes("")) {
      this.templateModalComponent.openModal();
    } else {
      this.deleteEmptyMarks();
      this._store.dispatch(new UpdateStudents(this.students));
      if (this.teacherId !== this.newTeacherId) {
        const newSubjectInfo: INewSubjectInfo = {
          _id: this.subject._id,
          teacherId: this.teacherId,
          newTeacherId: this.newTeacherId
        };
        this._store.dispatch(new UpdateSubjectTeachersId(newSubjectInfo));
      }
      this.notification.openNotification();
      this.saved = true;
      setTimeout(() =>
        this._router.navigate([`subjects/${this.subjectName}/${this.newTeacherId}`]),
        4000);
      this.teacherId = this.newTeacherId;
      this.getTeacher(this.teacherId);
      this.visibilitySaveButton = false;
      this.saved = false;
    }
  }
}
