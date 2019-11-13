export class Subject {
  constructor(
    public _id: string,
    public name: string,
    public teachersID: string[],
    public cabinet: number,
    public description: string
  ) { }
}
