import { AcademicPerformance } from './academicPerformance';

export class Student {
  academicPerformance: AcademicPerformance[];

  constructor(
    public id: number,
    public name: string,
    public lastName: string,
    public age: number,
    public address: string
  ) {
    this.academicPerformance = [];
  }
}
