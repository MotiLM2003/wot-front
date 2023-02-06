import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TasksList from "./TasksList";

const TasksEngineSettings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0, y: 0 }}
      style={{ overflow: "hidden" }}
      className="mt-2"
    >
      <TasksList />
    </motion.div>
  );
};

export default TasksEngineSettings;
