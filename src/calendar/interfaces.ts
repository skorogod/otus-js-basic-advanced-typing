import { Task } from "./TaskClass";

export interface ITask {
  id: number;
  text: string;
  date: Date;
  status: string;
  tags: Array<string>;
}

export interface ICalendar {
  name: string;

  createTask: (
    date: Date,
    text: string,
    tags: ITask["tags"],
  ) => Promise<ITask["id"]>;

  readTask: (taskId: ITask["id"]) => Promise<ITask | null>;

  updateTask: (
    taskId: ITask["id"],
    date: ITask["date"],
    text: ITask["text"],
    tags: string[],
    status: ITask["status"],
  ) => Promise<Task | null>;

  deleteTask: (taskId: ITask["id"]) => Promise<ITask["id"] | null>;

  filterTasks: (options: Options) => Promise<ITask[]>;

  getTasksArray: () => Promise<ITask[] | null>;

  getTaskById: (taskId: number) => Promise<ITask | null>;
}

export interface Options extends Partial<Exclude<ITask, "id">> {
  tasksArray: ITask[];
}
