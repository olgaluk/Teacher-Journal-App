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
  updateTeacherListInSubject,
  reset,
  updateDataSaved,
} from '../../subjects/subject-detail/subject-detail.actions';

import {
  ISubjectDetailState,
  initialSubjectDetailState,
} from '../../subjects/subject-detail/subject-detail.state';

import { Student } from '../../../../common/entities/student';
import { Marks } from '../../../../common/entities/student';
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
    (state, { subjectName }) => ({
      ...state,
      dates: getCurrentDates(state.selectedStudentsBySubject, subjectName)
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
    updateTeacherListInSubject,
    (state, { teacherId, newTeacherId }) => ({
      ...state,
      selectedSubject: updateTeacherList(state.selectedSubject, teacherId, newTeacherId)
    })
  ),
  on(
    reset,
    () => initialSubjectDetailState
  ),
  on(
    updateDataSaved,
    (state, { save }) => ({ ...state, dataSaved: save })
  )
);

export function subjectDetailReducers(state, action): ISubjectDetailState {
  return _subjectDetailReducers(state, action);
}

const getCurrentDates = (
  selectedStudentsBySubject: Student[],
  subjectName: string,
): string[] => {
  let dates: string[] = [];
  const students: Student[] = JSON.parse(JSON.stringify(selectedStudentsBySubject));
  students
    .forEach((student: Student) => {
      const marks: Marks = student.academicPerformance[subjectName].marks;
      const currentDates: string[] = Object.keys(marks);
      dates = dates.concat(currentDates);
    });
  dates = Array.from(new Set(dates));
  if (dates.includes('')) {
    dates.splice(dates.indexOf(''), 1);
    dates = dates
      .map(date => (new Date(date)).getTime())
      .sort((a, b) => a - b)
      .map(date => (new Date(date)).toDateString());
    dates.push('');
  } else {
    dates = dates
      .map(date => (new Date(date)).getTime())
      .sort((a, b) => a - b)
      .map(date => (new Date(date)).toDateString());
  }

  return dates;
};

const addEmptyDateInState = (state: ISubjectDetailState): ISubjectDetailState => {
  const { dates, selectedSubject, selectedStudentsBySubject } = state;
  const newStudentsBySubject: Student[] = JSON.parse(JSON.stringify(selectedStudentsBySubject));

  if (dates[dates.length - 1]) {
    const subjectName: string = selectedSubject.name;

    newStudentsBySubject.forEach((student: Student) => {
      student.academicPerformance[subjectName].marks[''] = null;
    });
  }

  return {
    ...state,
    selectedStudentsBySubject: newStudentsBySubject,
    dates: [...dates, ''],
    visibilitySaveButton: true,
  };
};

const changeDateInState = (state: ISubjectDetailState, newDate: string, count: number): ISubjectDetailState => {
  const { dates, selectedSubject, selectedStudentsBySubject, visibilitySaveButton } = state;
  const newStudentsBySubject: Student[] = JSON.parse(JSON.stringify(selectedStudentsBySubject));
  const subjectName: string = selectedSubject.name;
  let newVisibilitySaveButton: boolean = visibilitySaveButton;

  if (newDate && !dates.includes(newDate)) {
    const oldDate: string = dates[count];

    newStudentsBySubject.forEach((student: Student) => {
      if (student.academicPerformance[subjectName].marks.hasOwnProperty(oldDate)) {
        const studentMark: Marks = student.academicPerformance[subjectName].marks;
        studentMark[newDate] = studentMark[oldDate];
        delete studentMark[oldDate];
        newVisibilitySaveButton = true;
      }
    });
  }

  return {
    ...state,
    selectedStudentsBySubject: newStudentsBySubject,
    dates: getCurrentDates(newStudentsBySubject, subjectName),
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
    selectedStudentsBySubject,
    visibilitySaveButton
  } = state;
  const newStudentsBySubject: Student[] = JSON.parse(JSON.stringify(selectedStudentsBySubject));
  const subjectName: string = selectedSubject.name;
  let newVisibilitySaveButton: boolean = visibilitySaveButton;

  newStudentsBySubject.forEach((student: Student) => {
    if (student._id = studentId) {
      student.academicPerformance[subjectName].marks[date] = markValue;
      newVisibilitySaveButton = true;
    }
  });

  return {
    ...state,
    selectedStudentsBySubject: newStudentsBySubject,
    visibilitySaveButton: newVisibilitySaveButton,
  };
};

const deleteEmptyMarksInState = (state: ISubjectDetailState): ISubjectDetailState => {
  const {
    selectedSubject,
    selectedStudentsBySubject,
  } = state;
  const newStudentsBySubject: Student[] = JSON.parse(JSON.stringify(selectedStudentsBySubject));
  const subjectName: string = selectedSubject.name;

  newStudentsBySubject.forEach((student: Student) => {
    const marks: Marks = student.academicPerformance[subjectName].marks;
    for (let date in marks) {
      if (marks[date] === null) {
        delete marks[date];
      }
    }
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
  const subjectName: string = selectedSubject.name;
  const teacherId: string = selectedTeacher.id;

  if (newTeacherId && teacherId !== newTeacherId) {
    newStudentsBySubject.forEach((student) => {
      student.academicPerformance[subjectName].teacherId = newTeacherId;
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
  newTeacherId: string,
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
