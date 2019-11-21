import { ETeacherActions, TeacherActions } from '../actions/teacher.actions';
import { initialTeacherState, ITeacherState } from '../state/teacher.state';

export const teacherReducers = (
  state = initialTeacherState,
  action: TeacherActions
): ITeacherState => {
  switch (action.type) {
    case ETeacherActions.GetTeachersBySubjectSuccess: {
      return {
        ...state,
        teachersBySubject: action.payload
      };
    }

    case ETeacherActions.SaveSelectedTeacher: {
      return {
        ...state,
        selectedTeacher: action.payload
      }
    }

    default:
      return state;
  }
}