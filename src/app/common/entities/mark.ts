export class Mark {
  date: string;
  mark: number | null;

  constructor(
    date: string,
    mark: number | null
  ) {
    this.date = date;
    this.mark = mark;
  }
}
