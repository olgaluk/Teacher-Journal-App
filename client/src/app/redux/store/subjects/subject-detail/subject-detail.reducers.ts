import { createReducer, on } from '@ngrx/store';

import {
  getSelectedSubjectSuccess,
  updateSelectedTeacherSuccess,
  getStudentsBySelectedSubjectSuccess,
  getTeachersFromOtherSubjectSuccess,
  changeVisibilitySaveButton,
  addEmptyDate,
  changeDate,
  changeMark,
  deleteEmptyMarks,
  reset,
  updateDataSaved,
  setSelectedTeacher,
} from '../../subjects/subject-detail/subject-detail.actions';

import {
  ISubjectDetailState,
  initialSubjectDetailState,
} from '../../subjects/subject-detail/subject-detail.state';

import { Student } from '../../../../common/entities/student';
import { Marks } from '../../../../common/entities/student';
import { Teacher } from 'src/app/common/entities/teacher';

const _subjectDetailReducers = createReducer(initialSubjectDetailState,
  on(
    getSelectedSubjectSuccess,
    (state, { subject }) => ({ ...state, selectedSubject: subject })
  ),
  on(
    updateSelectedTeacherSuccess,
    (state, { teacherId, teacher }) => (setNewTeacher(state, teacherId, teacher))
  ),
  on(
    getStudentsBySelectedSubjectSuccess,
    (state, { students }) => ({ ...state, selectedStudentsBySubject: students })
  ),
  on(
    getTeachersFromOtherSubjectSuccess,
    (state, { teachers }) => ({ ...state, teachersFromOtherSubjects: teachers })
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
    (state, { newDate, oldDate }) => (changeDateInState(state, newDate, oldDate))
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
    reset,
    () => initialSubjectDetailState
  ),
  on(
    updateDataSaved,
    (state, { save }) => ({ ...state, dataSaved: save })
  ),
  on(
    setSelectedTeacher,
    (state, { teacher }) => ({ ...state, selectedTeacher: teacher })
  ),
);

export function subjectDetailReducers(state, action): ISubjectDetailState {
  return _subjectDetailReducers(state, action);
}

const setNewTeacher = (
  state: ISubjectDetailState,
  teacherId: string,
  teacher: Teacher
): ISubjectDetailState => {
  const {
    selectedSubject,
    selectedStudentsBySubject,
  } = state;
  const subjectName: string = selectedSubject.name;
  const newStudentsBySubject: Student[] = JSON.parse(JSON.stringify(selectedStudentsBySubject));

  const teachersID: string[] = selectedSubject.teachersID
    .map((id) => {
      let newId: string = id;
      if (id === teacherId) newId = teacher.id;
      return newId;
    });

  newStudentsBySubject.forEach((student: Student) => {
    student.academicPerformance[subjectName].teacherId = teacher.id;
  });

  return {
    ...state,
    selectedTeacher: teacher,
    selectedSubject: { ...selectedSubject, teachersID },
    selectedStudentsBySubject: newStudentsBySubject,
  };
}

const addEmptyDateInState = (state: ISubjectDetailState): ISubjectDetailState => {
  const { selectedSubject, selectedStudentsBySubject } = state;
  const newStudentsBySubject: Student[] = JSON.parse(JSON.stringify(selectedStudentsBySubject));
  const subjectName: string = selectedSubject.name;
  newStudentsBySubject.forEach((student: Student) => {
    student.academicPerformance[subjectName].marks[''] = null;
  });

  return {
    ...state,
    selectedStudentsBySubject: newStudentsBySubject,
    visibilitySaveButton: true,
  };
};

const changeDateInState = (state: ISubjectDetailState, newDate: string, oldDate: string): ISubjectDetailState => {
  const { selectedSubject, selectedStudentsBySubject, visibilitySaveButton } = state;
  const newStudentsBySubject: Student[] = JSON.parse(JSON.stringify(selectedStudentsBySubject));
  const subjectName: string = selectedSubject.name;
  let newVisibilitySaveButton: boolean = visibilitySaveButton;

  newStudentsBySubject.forEach((student: Student) => {
    if (student.academicPerformance[subjectName].marks.hasOwnProperty(oldDate)) {
      const studentMark: Marks = student.academicPerformance[subjectName].marks;
      studentMark[newDate] = studentMark[oldDate];
      delete studentMark[oldDate];
      newVisibilitySaveButton = true;
    }
  });

  return {
    ...state,
    selectedStudentsBySubject: newStudentsBySubject,
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
    if (student._id === studentId) {
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
