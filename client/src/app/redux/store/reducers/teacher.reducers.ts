import { ETeacherActions, TeacherActions } from '../actions/teacher.actions';
import { initialTeacherState, ITeacherState } from '../state/teacher.state';

export const teacherReducers = (
  state = initialTeacherState,
  action: TeacherActions
): ITeacherState => {
  switch (action.type) {
    case ETeacherActions.GetTeachersSuccess: {
      return {
        ...state,
        teachers: action.payload
      };
    }

    case ETeacherActions.GetTeachersBySubjectSuccess: {
      return {
        ...state,
        teachersBySubject: action.payload
      };
    }

    case ETeacherActions.GetSelectedTeacher: {
      const teacherId = action.payload;
      const selectedTeacher = state.teachers.find(teacher => teacher.id === teacherId);

      return {
        ...state,
        selectedTeacher
      }
    }

    case ETeacherActions.GetTeachersFromOtherSubjectSuccess: {
      return {
        ...state,
        teachersFromOtherSubjects: action.payload
      }
    }

    case ETeacherActions.DeleteTeachersBySubject: {
      const teachersBySubject = null;
      return {
        ...state,
        teachersBySubject
      }
    }

    default:
      return state;
  }
}