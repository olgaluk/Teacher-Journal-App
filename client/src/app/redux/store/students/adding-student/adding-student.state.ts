export interface IAddingStudentState {
  name: string;
  lastName: string;
  age: number | null;
  address: string;
  nameInfo: string;
  lastNameInfo: string;
  ageInfo: string;
  addressInfo: string;
  valuesСorrectness: boolean;
  dataSaved: boolean;
}

export const initialAddingStudentState: IAddingStudentState = {
  name: null,
  lastName: null,
  age: null,
  address: null,
  nameInfo: null,
  lastNameInfo: null,
  ageInfo: null,
  addressInfo: null,
  valuesСorrectness: false,
  dataSaved: false,
};
