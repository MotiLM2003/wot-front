import React, { useState, useEffect } from "react";
import IsActive from "@components/Shared/IsActive/IsActive";
import { useSelector } from "react-redux";
import {
  Button,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import moment from "moment";
import { toast } from "react-toastify";

import api from "apis/userAPI";

const TaskItem = ({ task }) => {
  const [cTask, setTask] = useState(task);
  const { user } = useSelector((state) => state.userReducer);
  const toggleTask = async () => {
    const isActive = !cTask.isActive;
    await api.post("logger/add", {
      loggerId: 2,
      statusCode: 200,
      descriptionId: 1,
      params: [
        `${user.firstName} ${user.lastName}`,
        `${task.description}`,
        `${isActive.toString()}`,
      ],
    });
    setTask((prev) => ({ ...prev, isActive: isActive }));
    const text = isActive
      ? "Starting task on server"
      : "Shutting down task on server";
    toast.success(text);

    const results = await api.post("tasks/set-task-status", {
      ...cTask,
      isActive: isActive,
    });
  };

  const updateTaskInterval = async () => {
    const results = await api.put("tasks/update", {
      _id: cTask._id,
      isActive: cTask.isActive,
      intervalType: cTask.intervalType,
      intervalTicks: cTask.intervalTicks,
    });
    await api.post("logger/add", {
      loggerId: 2,
      statusCode: 200,
      descriptionId: 2,
      params: [`${user.firstName} ${user.lastName}`, `${task.description}`],
    });
    toast.success("Task interval updated successfully");
  };

  const runTaskOnServer = async () => {
    const results = await api.post("tasks/run-task", cTask);
    await api.post("logger/add", {
      loggerId: 2,
      statusCode: 200,
      descriptionId: 3,
      params: [`${user.firstName} ${user.lastName}`, `${task.description}`],
    });
    toast.success("Task is running on the server");
  };

  return (
    <div>
      <div className="flex items-center gap-4 pb-1">
        <div>
          <IsActive isActive={cTask.isActive} width="13" height="12" />
        </div>
        <div className="w-[250px]"> {cTask.description}</div>
        <div>
          <Select
            size="xs"
            value={cTask.intervalType}
            onChange={(e) => {
              console.log(e.target.value);
              setTask({ ...cTask, intervalType: e.target.value });
            }}
          >
            <option value="0">In Minutes</option>
            <option value="1">In Hours</option>
          </Select>
        </div>
        <div className="xs-input">
          <Input
            type="number"
            size="xs"
            value={cTask.intervalTicks}
            className="text-center"
            onChange={(e) => {
              setTask({ ...cTask, intervalTicks: e.target.value });
            }}
          />
        </div>
        <div className="text-xs w-[90px]">
          {cTask.lastStartDate
            ? moment(cTask.lastStartDate).format("DD-MM-YY HH:mm")
            : "Never"}
        </div>
        <div className="text-xs w-[90px]">
          {cTask.lastRunDate
            ? moment(cTask.lastRunDate).format("DD-MM-YY HH:mm")
            : "Never"}
        </div>
        <div>
          <Button
            size={"xs"}
            variant="outline"
            colorScheme="blue"
            onClick={() => {
              updateTaskInterval(task);
            }}
          >
            Update time interval
          </Button>
        </div>
        <div>
          <Button
            size={"xs"}
            variant="outline"
            colorScheme="green"
            onClick={() => {
              runTaskOnServer();
            }}
          >
            Run task
          </Button>
        </div>
        <div>
          <Button
            size={"xs"}
            colorScheme={cTask.isActive ? "red" : "green"}
            onClick={() => {
              toggleTask();
            }}
          >
            {cTask.isActive ? "Shut down task" : "Activate task"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
