import { createReducer, on } from '@ngrx/store';

import {
  getSelectedSubjectSuccess,
  getSelectedTeacherSuccess,
  getStudentsBySelectedSubjectSuccess,
  getDates,
} from '../../subjects/subject-detail/subject-detail.actions';

import {
  ISubjectDetailState,
  initialSubjectDetailState,
} from '../../subjects/subject-detail/subject-detail.state';

import { Student } from '../../../../common/entities/student';

const _subjectDetailReducers = createReducer(initialSubjectDetailState,
  on(getSelectedSubjectSuccess, (state, { subject }) => ({ ...state, selectedSubject: subject })),
  on(getSelectedTeacherSuccess, (state, { teacher }) => ({ ...state, selectedTeacher: teacher })),
  on(getStudentsBySelectedSubjectSuccess, (state, { students }) => { return ({ ...state, selectedStudentsBySubject: students }) }),
  on(getDates, (state, { teacherId, subjectId }) => ({ ...state, dates: GetDates(state.selectedStudentsBySubject, teacherId, subjectId) }))
);

export function subjectDetailReducers(state, action): ISubjectDetailState {
  return _subjectDetailReducers(state, action);
}

const GetDates = (
  selectedStudentsBySubject: Student[],
  teacherId: string,
  subjectId: string
) => {
  let dates = [];
  const students = JSON.parse(JSON.stringify(selectedStudentsBySubject));
  students
    .forEach(student => {
      student.academicPerformance
        .forEach(studentInfo => {
          if (studentInfo.subjectId === subjectId
            && studentInfo.teacherId === teacherId) {
            studentInfo.marks.forEach(mark => dates.push(mark.date));
          }
        });
    });
  dates = Array.from(new Set(dates));
  if (dates.includes("")) {
    dates.splice(dates.indexOf(""), 1);
    dates = dates
      .map(date => (new Date(date)).getTime())
      .sort((a, b) => a - b)
      .map(date => (new Date(date)).toDateString());
    dates.push("");
  } else {
    dates = dates
      .map(date => (new Date(date)).getTime())
      .sort((a, b) => a - b)
      .map(date => (new Date(date)).toDateString());
  }

  return dates;
}