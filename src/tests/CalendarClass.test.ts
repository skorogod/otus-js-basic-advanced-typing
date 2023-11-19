import { Calendar } from "../calendar/CalendarClass";
import { Task } from "../calendar/TaskClass";
import { ITask } from "../calendar/interfaces";

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("tasks", JSON.stringify([]));
});

describe("CalendarClass", () => {
  const calendar = new Calendar("my Calnedar");

  test("calendar createTask adds new task to localStorage", async () => {
    let tasks = JSON.parse(localStorage.getItem("tasks") as string);
    expect(tasks).toHaveLength(0);

    await calendar.createTask(new Date("2023-11-10"), "doing js exercise", [
      "programming",
      "js",
    ]);
    tasks = JSON.parse(localStorage.getItem("tasks") as string);
    expect(tasks).toHaveLength(1);
  });

  test("calendar readTask returns task with specified ID", async () => {
    const taskId = await calendar.createTask(
      new Date("2023-11-10"),
      "doing js exercise",
      ["programming", "js"],
    );
    expect(taskId).toBe(0);
    const task = await calendar.readTask(taskId);
    expect(task).toBeInstanceOf(Task);
  });

  test("calendar deleteTask deletes task with specified ID", async () => {
    const taskId = await calendar.createTask(
      new Date("2023-11-10"),
      "doing js exercise",
      ["programming", "js"],
    );
    let tasks = JSON.parse(localStorage.getItem("tasks") as string);
    expect(tasks.length > 0).toBeTruthy();

    await calendar.deleteTask(taskId);
    tasks = JSON.parse(localStorage.getItem("tasks") as string);
    expect(tasks.length === 0).toBeTruthy();
  });

  test("calendar updateTask updates task according to passed params", async () => {
    const taskId = await calendar.createTask(
      new Date("2023-11-10"),
      "doing js exercise",
      ["programming", "js"],
    );
    let task = await calendar.readTask(taskId);

    expect(task?.id).toBe(taskId);
    expect(task?.text).toBe("doing js exercise");
    expect(task?.tags).toEqual(["programming", "js"]);
    expect(task?.date).toStrictEqual(new Date("2023-11-10"));
    expect(task?.status).toBe("active");

    await calendar.updateTask(
      taskId,
      {
        date: new Date("2023-11-12"),
        text: "learn english",
        tags: ["languages"],
        status: "active",
      }
    );

    task = await calendar.readTask(taskId);

    expect(task?.id).toBe(taskId);
    expect(task?.text).toBe("learn english");
    expect(task?.tags).toEqual(["languages"]);
    expect(task?.date).toStrictEqual(new Date("2023-11-12"));
    expect(task?.status).toBe("active");
  });

  test("calendar filterTask filters task according to passed params", async () => {
    let filteredTasks: ITask[];
    const task1 = await calendar.createTask(
      new Date("2023-11-10"),
      "doing js exercise",
      ["programming", "js"],
    );
    const task2 = await calendar.createTask(
      new Date("2023-11-20"),
      "learn english",
      ["languages"],
    );
    const task3 = await calendar.createTask(
      new Date("2023-11-30"),
      "fitness training",
      ["fitness", "GYM"],
    );

    let tasks = await calendar.getTasksArray();

    expect(tasks.length).toBe(3);

    //filter by text
    filteredTasks = await calendar.filterTasks({
      text: "english",
    });

    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].id).toBe(task2);

    //filter by date
    filteredTasks = await calendar.filterTasks({
      date: new Date("2023-11-10"),
    });

    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].id).toBe(task1);

    //filter by tags
    filteredTasks = await calendar.filterTasks({
      tags: ["fitness"],
    });

    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].id).toBe(task3);

    //filter by status
    await calendar.updateTask(
      task1,
      {
        date: new Date("2023-11-10"),
        text: "doing js exercise",
        tags: ["programming", "js"],
        status: "done",
      }
    );

    tasks = await calendar.getTasksArray();
    console.log(tasks);
    filteredTasks = await calendar.filterTasks({
      status: "done",
    });

    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].id).toBe(task1);
  });
});
