import { getTasksArray } from "./getTasksArray";
import { ITask, ICalendar } from "./interfaces";

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