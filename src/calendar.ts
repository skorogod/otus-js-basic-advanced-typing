export interface ITask {
    id: number;
    text: string;
    date: Date;
    status: string;
    tags: Array<string>;
}

export class Task implements ITask {
    id: number;
    text: string;
    date: Date;
    status: string;
    tags: string[];

    constructor(id: number, text: string, 
                date: Date, status: string, tags: string[]) {
        this.id = id;
        this.date = date
        this.text = text;
        this.status = status;
        this.tags = tags;
        console.log(typeof(date))
    }
}

interface Options extends Partial<Exclude<ITask, "id">> {
    tasksArray: ITask[];
}

export async function getTasksArray(): Promise<ITask[]> {
    return new Promise((resolve, reject) => {
        let tasksArray: Array<Task>;
        let tasks = localStorage.getItem("tasks");
    
        if (tasks && typeof tasks === "string") {
            tasksArray = JSON.parse(tasks);
        }
    
        else {
            tasksArray = [];
        };

        resolve(tasksArray)
    })
}

export async function getTaskById(taskId: number, tasksArray: ITask[]): Promise<ITask | null> {
    return new Promise((resolve, reject) => {
        tasksArray.forEach(task => {
            if (task.id === taskId) {
                resolve(task);
            }
        })
    
        reject("Task not found")
    })
}

export interface calendar {
    name: string;

    createTask: (date: Date, text: string, tags: ITask["tags"]) => Promise<ITask["id"]>;

    readTask: (taskId: ITask["id"]) => Promise<ITask | null>;

    updateTask: (taskId: ITask["id"], text: ITask["text"], 
                    date: ITask["date"], status: ITask['status']) => Promise<Task | null>;

    deleteTask: (taskId: ITask["id"]) => Promise<ITask["id"] | null>;

    filterTasks: (options: Options) => Promise<ITask[]>;
}


export class Calendar implements calendar {
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
                if (options.date) {
                    tasksArray = tasksArray.filter(task => {
                        console.log(typeof(task.date))
                        return (task.date.getTime() === date.getTime())
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