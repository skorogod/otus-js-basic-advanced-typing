import { Calendar } from "./calendar/CalendarClass"

import {getTasksArray} from './calendar/getTasksArray'

const calendar = new Calendar("My calendar");

(async () => {
    //const tadskID = await calendar.createTask(new Date('2023-11-18'), "Shop", ["Shop"]);
    let tasksArray = await getTasksArray();

    tasksArray = await calendar.filterTasks({tasksArray: tasksArray, date: new Date("2023-11-17")})
    console.log(tasksArray);

})()