export interface Marks {
  [key: string]: number;
}

export interface AcademicPerformance {
  [key: string]: {
    teacherId: string;
    marks: Marks;
  }
}

export class Student {
  academicPerformance: AcademicPerformance;
  _id: string;
  constructor(
    public name: string,
    public lastName: string,
    public age: number,
    public address: string
  ) { }
}
