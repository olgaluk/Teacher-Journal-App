import { createReducer, on } from '@ngrx/store';

import {
  getSelectedSubjectSuccess,
  getSelectedTeacherSuccess,
  getStudentsBySelectedSubjectSuccess,
  getDates,
  getTeachersFromOtherSubjectSuccess,
  changeVisibilitySaveButton,
  addEmptyDate,
  changeDate,
  changeMark,
  deleteEmptyMarks,
  updateTeacherInStudents,
  updateInfoInDatabaseSuccess,
  updateTeacherListInSubject,
} from '../../subjects/subject-detail/subject-detail.actions';

import {
  ISubjectDetailState,
  initialSubjectDetailState,
} from '../../subjects/subject-detail/subject-detail.state';

import { Student } from '../../../../common/entities/student';
import { Mark } from '../../../../common/entities/mark';
import { AcademicPerformance } from '../../../../common/entities/academicPerformance';
import { Subject } from '../../../../common/entities/subject';

const _subjectDetailReducers = createReducer(initialSubjectDetailState,
  on(
    getSelectedSubjectSuccess,
    (state, { subject }) => ({ ...state, selectedSubject: subject })
  ),
  on(
    getSelectedTeacherSuccess,
    (state, { teacher }) => ({ ...state, selectedTeacher: teacher })
  ),
  on(
    getStudentsBySelectedSubjectSuccess,
    (state, { students }) => ({ ...state, selectedStudentsBySubject: students })
  ),
  on(
    getDates,
    (state, { teacherId, subjectId }) => ({
      ...state,
      dates: getCurrentDates(state.selectedStudentsBySubject, teacherId, subjectId)
    })
  ),
  on(
    getTeachersFromOtherSubjectSuccess,
    (state, { teachersFromOtherSubjects }) => ({ ...state, teachersFromOtherSubjects })
  ),
  on(
    changeVisibilitySaveButton,
    (state, { visibility }) => ({ ...state, visibilitySaveButton: visibility })
  ),
  on(
    addEmptyDate,
    (state) => (addEmptyDateInState(state))
  ),
  on(
    changeDate,
    (state, { newDate, count }) => (changeDateInState(state, newDate, count))
  ),
  on(
    changeMark,
    (state, { markValue, date, studentId }) => (changeMarkInState(state, markValue, date, studentId))
  ),
  on(
    deleteEmptyMarks,
    (state) => (deleteEmptyMarksInState(state))
  ),
  on(
    updateTeacherInStudents,
    (state, { newTeacherId }) => (updateTeacherInStudentsInState(state, newTeacherId))
  ),
  on(
    updateInfoInDatabaseSuccess,
    (state, { save }) => ({ ...state, dataSaved: save })
  ),
  on(
    updateTeacherListInSubject,
    (state, { teacherId, newTeacherId }) => ({
      ...state,
      selectedSubject: updateTeacherList(state.selectedSubject, teacherId, newTeacherId)
    })
  )
);

export function subjectDetailReducers(state, action): ISubjectDetailState {
  return _subjectDetailReducers(state, action);
}

const getCurrentDates = (
  selectedStudentsBySubject: Student[],
  teacherId: string,
  subjectId: string,
): string[] => {
  let dates = [];
  const students: Student[] = JSON.parse(JSON.stringify(selectedStudentsBySubject));
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
};

const addEmptyDateInState = (state: ISubjectDetailState): ISubjectDetailState => {
  const { dates, selectedSubject, selectedTeacher, selectedStudentsBySubject } = state;
  const newStudentsBySubject: Student[] = JSON.parse(JSON.stringify(selectedStudentsBySubject));

  if (dates[dates.length - 1]) {
    const subjectId: string = selectedSubject._id;
    const teacherId: string = selectedTeacher.id;

    newStudentsBySubject
      .map(student => {
        student.academicPerformance
          .map(studentInfo => {
            if (studentInfo.subjectId === subjectId
              && studentInfo.teacherId === teacherId) {
              studentInfo.marks.push(new Mark("", null))
            }
            return studentInfo;
          });

        return student;
      });
  }

  return {
    ...state,
    selectedStudentsBySubject: newStudentsBySubject,
    dates: [...dates, ""],
    visibilitySaveButton: true,
  };
};

const changeDateInState = (state: ISubjectDetailState, newDate: string, count: number): ISubjectDetailState => {
  const { dates, selectedSubject, selectedTeacher, selectedStudentsBySubject, visibilitySaveButton } = state;
  const newStudentsBySubject: Student[] = JSON.parse(JSON.stringify(selectedStudentsBySubject));
  const subjectId: string = selectedSubject._id;
  const teacherId: string = selectedTeacher.id;
  let newVisibilitySaveButton: boolean = visibilitySaveButton;

  if (newDate && !dates.includes(newDate)) {
    const oldDate: string = dates[count];

    newStudentsBySubject
      .map(student => {
        student.academicPerformance
          .map(studentInfo => {
            if (studentInfo.subjectId === subjectId
              && studentInfo.teacherId === teacherId && studentInfo.marks.length) {
              studentInfo.marks.map(mark => {
                const newMark = mark;
                if (mark.date === oldDate) {
                  newMark.date = newDate;
                  newVisibilitySaveButton = true;
                }
                return newMark;
              });
            }
            return studentInfo;
          });

        return student;
      });
  }

  return {
    ...state,
    selectedStudentsBySubject: newStudentsBySubject,
    dates: getCurrentDates(newStudentsBySubject, teacherId, subjectId),
    visibilitySaveButton: newVisibilitySaveButton,
  };
};

const changeMarkInState = (
  state: ISubjectDetailState,
  markValue: number,
  date: string,
  studentId: string,
): ISubjectDetailState => {
  const {
    selectedSubject,
    selectedTeacher,
    selectedStudentsBySubject,
    visibilitySaveButton
  } = state;
  const newStudentsBySubject: Student[] = JSON.parse(JSON.stringify(selectedStudentsBySubject));
  const subjectId: string = selectedSubject._id;
  const teacherId: string = selectedTeacher.id;
  let newVisibilitySaveButton: boolean = visibilitySaveButton;

  if (studentId) {
    const selectedStudentPerformance = newStudentsBySubject
      .find((student: Student) => student._id === studentId)
      .academicPerformance
      .find((studentPerformance: AcademicPerformance) => studentPerformance.subjectId
        && studentPerformance.subjectId === subjectId
        && studentPerformance.teacherId === teacherId);

    const studentIncludeDate: boolean = selectedStudentPerformance
      .marks
      .some((mark: Mark) => mark.date === date);

    if (!studentIncludeDate) {
      selectedStudentPerformance
        .marks
        .push(new Mark(date, markValue));
    } else {
      selectedStudentPerformance
        .marks
        .map((mark: Mark) => {
          if (mark.date === date) {
            mark.value = markValue;
            newVisibilitySaveButton = true;
          }
          return mark;
        });
    }
  }

  return {
    ...state,
    selectedStudentsBySubject: newStudentsBySubject,
    visibilitySaveButton: newVisibilitySaveButton,
  };
};

const deleteEmptyMarksInState = (state: ISubjectDetailState): ISubjectDetailState => {
  const {
    selectedSubject,
    selectedTeacher,
    selectedStudentsBySubject,
  } = state;
  const newStudentsBySubject: Student[] = JSON.parse(JSON.stringify(selectedStudentsBySubject));
  const subjectId: string = selectedSubject._id;
  const teacherId: string = selectedTeacher.id;

  newStudentsBySubject.forEach((student: Student) => {
    student.academicPerformance
      .forEach((studentPerformance: AcademicPerformance) => {
        if (studentPerformance.subjectId === subjectId
          && studentPerformance.teacherId === teacherId && studentPerformance.marks.length) {
          studentPerformance.marks = studentPerformance.marks
            .map((mark: Mark) => {
              if (mark.value === null) {
                return null;
              }
              return mark;
            })
            .filter(mark => mark);
        }
      });
  });

  return {
    ...state,
    selectedStudentsBySubject: newStudentsBySubject,
    visibilitySaveButton: false,
  };
};

const updateTeacherInStudentsInState = (state: ISubjectDetailState, newTeacherId: string) => {
  const {
    selectedSubject,
    selectedTeacher,
    selectedStudentsBySubject,
  } = state;
  const newStudentsBySubject: Student[] = JSON.parse(JSON.stringify(selectedStudentsBySubject));
  const subjectId: string = selectedSubject._id;
  const teacherId: string = selectedTeacher.id;

  if (newTeacherId && teacherId !== newTeacherId) {
    newStudentsBySubject.forEach((student) => {
      student
        .academicPerformance.
        find((studentPerformance: AcademicPerformance) => {
          if (studentPerformance.subjectId === subjectId
            && studentPerformance.teacherId === teacherId) {
            studentPerformance.teacherId = newTeacherId;
          }
        });
    });
  }

  return {
    ...state,
    selectedStudentsBySubject: newStudentsBySubject,
  };
};

const updateTeacherList = (
  selectedSubject: Subject,
  teacherId: string,
  newTeacherId: string
) => {
  const newSelectedSubject: Subject = JSON.parse(JSON.stringify(selectedSubject));
  if (newTeacherId && newTeacherId !== teacherId) {
    newSelectedSubject.teachersID = newSelectedSubject.teachersID
      .map((id) => {
        if (id === teacherId) id = newTeacherId;
        return id;
      })
  }

  return newSelectedSubject;
}