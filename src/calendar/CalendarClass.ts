import { ICalendar, ITask, Options } from "./interfaces";
import { getTaskById } from "./getTaskById";
import { getTasksArray } from "./getTasksArray";
import { Task } from "./TaskClass";


export class Calendar implements ICalendar {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    createTask: (date: Date, text: string, tags: Task["tags"]) => Promise<number> = async (date, text, tags) => {
        return new Promise(async (resolve, reject) => {
            try {
                let tasksArray = await getTasksArray();
        
                let task: Task = new Task(tasksArray.length, text, date, "active", tags);
        
                tasksArray.push(task);
        
                localStorage.setItem("tasks", JSON.stringify(tasksArray));

                resolve(task.id)
            }
    
            catch(error) {
                throw new Error(error);
            }
        })
    }
    
    async readTask(taskId: number): Promise<ITask | null> {
        return new Promise(async (resolve, reject) => {
            let tasksArray = await getTasksArray();
    
            if (tasksArray) {
                tasksArray.forEach(task => {
                    if(task.id === taskId) {
                        resolve(task);
                    }
                })
    
                reject("Task not found");
            };
            
    
            reject("Task not found");;
        })
    }

    async updateTask(taskId: number, text: string, date: Date, status: string): Promise<ITask | null> {
        return new Promise(async (resolve, reject) => {
            let tasksArray = await getTasksArray();

            if (tasksArray) {
                let task: ITask | null = await getTaskById(taskId, tasksArray);
        
                if (task) {
                    task.text = text;
                    task.date = date;
                    task.status = status
        
                    localStorage.setItem("tasks", JSON.stringify(tasksArray));
        
                    resolve(task);
                }

                reject("Task not found")
            }
    
            reject("Task not found")
        })
    };

    async deleteTask(taskId: number): Promise<number | null> {
        return new Promise(async (resolve, reject) => {
            let tasksArray: ITask[] = await getTasksArray();
    
            if (tasksArray) {
                const task: ITask | null = await getTaskById(taskId, tasksArray);
    
                if (task) {
                    tasksArray.splice(tasksArray.indexOf(task), 1);
                    localStorage.setItem("tasks", JSON.stringify(tasksArray));

                    resolve(taskId)
                }
    
                reject("Task not found")
            }
    
            reject("Task not found");
        })
    };

    async filterTasks(options: Options): Promise<ITask[]> {
        let tasksArray = options.tasksArray;
        const date = options.date;
        const text = options.text;
        const tags = options.tags;
        const status = options.status;

        return new Promise(async (resolve, reject) => {
            if (tasksArray.length === 0) {
                reject("Tasks array is empty");
            }

            try {
                if (options.date !== undefined) {
                    tasksArray = tasksArray.filter(task => {
                        console.log(`FILTER ${typeof(task.date)}`)
                        return (task.date.getTime() === options.date?.getTime())
                    })
                }
    
                if (text) {
                    tasksArray = tasksArray.filter(task => {
                        return task.text.toLowerCase().includes(text.toLowerCase());
                    })
                }

                if (tags) {
                    tasksArray = tasksArray.filter(task => {
                        tags.forEach(tag => {
                            if (task.tags.includes(tag)) {
                                return true;
                            }
                        })
                        return false;
                    })
                }

                if (status) {
                    tasksArray = tasksArray.filter(task => {
                        return task.status === status;
                    })
                }

                resolve(tasksArray);
            }

            catch (err) {
                throw new Error(err);
            }
        })
    }
    
}