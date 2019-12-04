import { AcademicPerformance } from './academicPerformance';

export class Student {
  academicPerformance: AcademicPerformance[];
  _id: string;
  constructor(
    public name: string,
    public lastName: string,
    public age: number,
    public address: string
  ) {
    this.academicPerformance = [];
  }
}
