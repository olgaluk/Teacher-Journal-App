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

    case ESubjectActions.GetSelectedSubjectSuccess: {
      return {
        ...state,
        selectedSubject: action.payload
      }
    }

    case ESubjectActions.AddNewSubjectSuccess: {
      const subjects = JSON.parse(JSON.stringify(state.subjects));
      subjects.push(action.payload);

      return {
        ...state,
        subjects
      }
    }

    case ESubjectActions.UpdateSubjectTeachersIdSuccess: {
      const subjects = JSON.parse(JSON.stringify(state.subjects));
      const modifiedSubject = action.payload;
      subjects.find(oldSubject => {
        if (oldSubject._id === modifiedSubject._id) {
          oldSubject = modifiedSubject;
        }
        return;
      });

      return {
        ...state,
        subjects
      }
    }

    default:
      return state;
  }
}
