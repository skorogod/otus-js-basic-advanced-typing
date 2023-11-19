import { ICalendar, ITask, Options } from "./interfaces";
import { Task } from "./TaskClass";


export class Calendar implements ICalendar {
    name: string;

    constructor(name: string) {
        this.name = name;
    };

    async getTasksArray(): Promise<ITask[]> {
        return new Promise((resolve, reject) => {
            let tasksArray: Array<Task>;
            let tasks = localStorage.getItem("tasks");
        
            if (tasks && typeof tasks === "string") {
                tasksArray = JSON.parse(tasks);
                
                tasksArray = tasksArray.map(task => {
                    return new Task(task.id, task.text, new Date(task.date), task.status, task.tags);
                })
            }
        
            else {
                tasksArray = [];
            };
    
            resolve(tasksArray)
        })
    }

    async getTaskById(taskId: number, tasksArray?: ITask[]): Promise<ITask | null> {
        return new Promise(async (resolve, reject) => {
            if (!tasksArray) {
                tasksArray = await this.getTasksArray();
            }
            
            if (tasksArray) {
                tasksArray.forEach(task => {
                    if (task.id === taskId) {
                        resolve(task);
                    }
                })

                reject("Task not found")
            }

            else {
                reject("TasksArray not found")
            } 
        })
    }

    createTask: (date: Date, text: string, tags: Task["tags"]) => Promise<number> = async (date, text, tags) => {
        return new Promise(async (resolve, reject) => {
            try {
                let tasksArray = await this.getTasksArray();
        
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
            let tasksArray = await this.getTasksArray();
    
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

    async updateTask(taskId: number, date: Date, text: string, tags: string[], status: string): Promise<ITask | null> {
        return new Promise(async (resolve, reject) => {
            let tasksArray = await this.getTasksArray();

            if (tasksArray) {
                let task: ITask | null = await this.getTaskById(taskId, tasksArray);
        
                if (task) {
                    task.text = text;
                    task.date = date;
                    task.tags = tags;
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
            let tasksArray: ITask[] = await this.getTasksArray();
    
            if (tasksArray) {
                const task: ITask | null = await this.getTaskById(taskId, tasksArray);
    
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
                        console.log(task.tags);
                        
                        for (let tag of tags) {
                            if (task.tags.includes(tag)) {
                                return true;
                            }
                        }
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