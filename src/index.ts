import {Calendar} from './calendar'

import {getTasksArray} from './calendar'

const calendar = new Calendar("My calendar");

(async () => {
    const tadskID = await calendar.createTask(new Date('2023-11-18'), "Shop", ["Shop"]);
    let tasksArray = await getTasksArray();
    console.log(tasksArray)
    

    tasksArray = await calendar.filterTasks({tasksArray: tasksArray, date: new Date("2023-11-18")})
    console.log(tasksArray);

})()