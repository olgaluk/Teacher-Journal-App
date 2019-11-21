import { ESubjectActions, SubjectActions } from '../actions/subject.actions';
import { initialSubjectState, ISubjectState } from '../state/subject.state';

export const subjectReducers = (
  state = initialSubjectState,
  action: SubjectActions
): ISubjectState => {
  switch (action.type) {
    case ESubjectActions.GetSubjectsSuccess: {
      return {
        ...state,
        subjects: action.payload
      };
    }

    case ESubjectActions.SaveSelectedSubject: {
      return {
        ...state,
        selectedSubject: action.payload
      }
    }

    default:
      return state;
  }
}
