interface IMessageFields {
  contentCharacters: string,
  lengthBottomLine?: string,
  lengthTopLine?: string,
  emptyField: string,
}

interface IErrorMessages {
  name: IMessageFields,
  lastName: IMessageFields,
  age: IMessageFields,
  address: IMessageFields,
  subjectName: IMessageFields,
  cabinet: IMessageFields,
  savingChanges: string,
}

export const errorMessages: IErrorMessages = {
  name: {
    contentCharacters: 'This field can only contain letters!',
    lengthBottomLine: 'Invalid name length! This field must contain at least two letters.',
    lengthTopLine: 'Invalid name length! This field should be limited to 15 letters.',
    emptyField: 'This field is required! Please fill in this field.',
  },
  lastName: {
    contentCharacters: 'This field can only contain letters!',
    lengthBottomLine: 'Invalid last name length! This field must contain at least two letters.',
    lengthTopLine: 'Invalid last name length! This field should be limited to 15 letters.',
    emptyField: 'This field is required! Please fill in this field.',
  },
  age: {
    contentCharacters: 'This field should contain only numbers!',
    lengthBottomLine: 'Incorrect age! Age cannot be less than 17 years.',
    lengthTopLine: 'Incorrect age! Age cannot be more than 24 years.',
    emptyField: 'This field is required! Please fill in this field.',
  },
  address: {
    contentCharacters: 'This field can only contain letters, numbers, spaces and commas!',
    lengthBottomLine: 'Invalid address length! This field must contain at least six characters.',
    lengthTopLine: 'Invalid address length! This field should be limited to 30 characters.',
    emptyField: 'This field is required! Please fill in this field.',
  },
  subjectName: {
    contentCharacters: 'This field can only contain letters!',
    lengthBottomLine: 'Invalid subject length! This field must contain at least 4 letters.',
    lengthTopLine: 'Invalid subject length! This field should be limited to 15 characters.',
    emptyField: 'This field is required! Please fill in this field.',
  },
  cabinet: {
    contentCharacters: 'This field should contain only numbers!',
    lengthBottomLine: 'Incorrect cabinet! This field cannot be less than 1.',
    lengthTopLine: 'Incorrect cabinet! This field cannot be more than 30.',
    emptyField: 'This field is required! Please fill in this field.',
  },
  savingChanges: `If you leave the page without saving the changes, they will be lost.
    Are you sure you want to leave the page without saving the changes?`,
}
