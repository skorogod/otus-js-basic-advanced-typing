import { Calendar } from "./calendar/CalendarClass"

const calendar = new Calendar("My calendar");

(async () => {
    //const tadskID = await calendar.createTask(new Date('2023-11-18'), "Shop", ["Shop"]);
    let tasksArray = await calendar.getTasksArray();

    tasksArray = await calendar.filterTasks({tasksArray: tasksArray, date: new Date("2023-11-17")})
    console.log(tasksArray);

})()