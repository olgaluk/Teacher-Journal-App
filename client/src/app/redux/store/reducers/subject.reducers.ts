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

    case ESubjectActions.GetSelectedSubject: {
      const subjectName = action.payload;
      const selectedSubject = state.subjects.find(subject => subject.name === subjectName);

      return {
        ...state,
        selectedSubject
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
