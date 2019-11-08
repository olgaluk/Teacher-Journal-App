export class Subject {
  constructor(
    public id: number,
    public name: string,
    public teachersID: number[],
    public cabinet: number,
    public description: string
  ) { }
}
