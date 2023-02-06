import React, { useState, useEffect } from "react";
import api from "apis/userAPI";

import TaskItem from "./TaskItem";
const TasksList = () => {
  const [tasks, setTasks] = useState([]);

  const getTasksList = async () => {
    const { data } = await api.post("/tasks/get", {});
    console.log("data", data);
    setTasks(data);
  };

  useEffect(() => {
    getTasksList();
  }, []);
  return (
    <div>
      <div>
        <div className="flex items-center gap-4 pb-1 border-b-2 mb-3 text-primary font-bold text-sm">
          <div className="w-[12px]">&nbsp;</div>
          <div className="w-[250px]">Task description</div>
          <div className="w-[162px] text-center">Interval type</div>

          <div className="w-[90px]">Last start</div>
          <div className=" w-[90px]">Last run</div>
          <div></div>
        </div>
      </div>
      <div>
        {tasks &&
          tasks.map((task) => {
            return <TaskItem key={task._id} task={task} />;
          })}
      </div>
    </div>
  );
};

export default TasksList;
