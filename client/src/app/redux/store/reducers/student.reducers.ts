import { EStudentActions, StudentActions } from '../actions/student.actions';
import { initialStudentState, IStudentState } from '../state/student.state';

import { Mark } from '../../../common/entities/mark';

export const studentReducers = (
  state = initialStudentState,
  action: StudentActions
): IStudentState => {
  switch (action.type) {
    case EStudentActions.GetStudentsSuccess: {
      return {
        ...state,
        students: action.payload
      };
    }

    case EStudentActions.GetStudentsByNameSuccess: {
      return {
        ...state,
        searchedStudents: action.payload
      };
    }

    case EStudentActions.GetStudentsBySelectedSubjectSuccess: {
      return {
        ...state,
        selectedStudentsBySubject: action.payload
      }
    }

    case EStudentActions.AddNewStudentSuccess: {
      const students = JSON.parse(JSON.stringify(state.students));
      students.push(action.payload);

      return {
        ...state,
        students
      }
    }

    case EStudentActions.UpdateStudentsSuccess: {
      const students = JSON.parse(JSON.stringify(state.students));
      const modifiedStudents = action.payload;
      modifiedStudents.forEach((modifiedStudent) => {
        students.find(oldStudent => {
          if (oldStudent._id === modifiedStudent._id) {
            oldStudent = modifiedStudent;
          }
          return;
        });
      });

      return {
        ...state,
        students
      }
    }

    case EStudentActions.GetDatesSuccess: {
      let dates = [];
      const { subjectId, teacherId } = action.payload;
      const students = JSON.parse(JSON.stringify(state.selectedStudentsBySubject));
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

      return {
        ...state,
        dates
      }
    }

    case EStudentActions.AddEmptyDateSuccess: {
      if (state.dates[state.dates.length - 1]) {
        const { subjectId, teacherId } = action.payload;
        const selectedStudentsBySubject = JSON.parse(JSON.stringify(state.selectedStudentsBySubject));

        selectedStudentsBySubject
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

        return {
          ...state,
          selectedStudentsBySubject
        };
      }
    }

    case EStudentActions.ChangeDateSuccess: {
      const { teacherId, subjectName, newDate, count } = action.payload;
      let selectedStudentsBySubject = JSON.parse(JSON.stringify(state.selectedStudentsBySubject));

      if (!state.dates.includes(newDate) && newDate) {
        const oldDate: string = state.dates[count];

        selectedStudentsBySubject
          .map(student => {
            student.academicPerformance
              .map(studentInfo => {
                if (studentInfo.subjectId === subjectName
                  && studentInfo.teacherId === teacherId && studentInfo.marks.length) {
                  studentInfo.marks.map(mark => {
                    const newMark = mark;
                    if (mark.date === oldDate) {
                      newMark.date = newDate;
                    }
                    return newMark;
                  });
                }
                return studentInfo;
              });

            return student;
          });

        return {
          ...state,
          selectedStudentsBySubject
        };
      }
    }

    default:
      return state;
  }
}
