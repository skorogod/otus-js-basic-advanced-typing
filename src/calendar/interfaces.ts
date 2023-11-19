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
    newTaskData: Omit<ITask, "id">,
  ) => Promise<Task | null>;

  deleteTask: (taskId: ITask["id"]) => Promise<ITask["id"] | null>;

  filterTasks: (filterOptions: filterOptions) => Promise<ITask[]>;

  getTasksArray: () => Promise<ITask[] | null>;

  getTaskById: (taskId: number) => Promise<ITask | null>;
}

export type filterOptions =  Partial<Omit<ITask, "id">>;
export type newTaskData = Omit<ITask, "id">;
