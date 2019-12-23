interface IMessageFields {
  contentCharacters: string,
  minlength?: string,
  maxlength?: string,
  required: string,
  min?: string,
  max?: string,
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
    minlength: 'Invalid name length! This field must contain at least two letters.',
    maxlength: 'Invalid name length! This field should be limited to 15 letters.',
    required: 'This field is required! Please fill in this field.',
  },
  lastName: {
    contentCharacters: 'This field can only contain letters!',
    minlength: 'Invalid last name length! This field must contain at least two letters.',
    maxlength: 'Invalid last name length! This field should be limited to 15 letters.',
    required: 'This field is required! Please fill in this field.',
  },
  age: {
    contentCharacters: 'This field should contain only numbers!',
    min: 'Incorrect age! Age cannot be less than 15 years.',
    max: 'Incorrect age! Age cannot be more than 30 years.',
    required: 'This field is required! Please fill in this field.',
  },
  address: {
    contentCharacters: 'This field can only contain letters, numbers, spaces and commas!',
    minlength: 'Invalid address length! This field must contain at least six characters.',
    maxlength: 'Invalid address length! This field should be limited to 30 characters.',
    required: 'This field is required! Please fill in this field.',
  },
  subjectName: {
    contentCharacters: 'This field can only contain letters!',
    minlength: 'Invalid subject length! This field must contain at least 4 letters.',
    maxlength: 'Invalid subject length! This field should be limited to 15 characters.',
    required: 'This field is required! Please fill in this field.',
  },
  cabinet: {
    contentCharacters: 'This field should contain only numbers!',
    minlength: 'Incorrect cabinet! This field cannot be less than 1.',
    maxlength: 'Incorrect cabinet! This field cannot be more than 30.',
    required: 'This field is required! Please fill in this field.',
  },
  savingChanges: `If you leave the page without saving the changes, they will be lost.
    Are you sure you want to leave the page without saving the changes?`,
}
