export class Subject {
  _id: string;
  constructor(
    public name: string,
    public teachersID: string[],
    public cabinet: number,
    public description: string
  ) { }
}
