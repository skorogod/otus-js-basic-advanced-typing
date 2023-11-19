import { ITask } from "./interfaces";

export class Task implements ITask {
  id: number;
  text: string;
  date: Date;
  status: string;
  tags: string[];

  constructor(
    id: number,
    text: string,
    date: Date,
    status: string,
    tags: string[],
  ) {
    this.id = id;
    this.date = date;
    this.text = text;
    this.status = status;
    this.tags = tags;
    console.log(typeof date);
  }
}
