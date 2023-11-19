import { ITask } from "./interfaces";
import { Task } from "./TaskClass";


export async function getTasksArray(): Promise<ITask[]> {
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