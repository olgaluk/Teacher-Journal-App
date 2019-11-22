import { EStudentActions, StudentActions } from '../actions/student.actions';
import { initialStudentState, IStudentState } from '../state/student.state';

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

    default:
      return state;
  }
}
