import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { logsTypes, logsAnswer } from "json-data/logs";
import api from "apis/userAPI";
import { Button, Select } from "@chakra-ui/react";
import Loglist from "./Loglist";
const SystemLogs = () => {
  const [currentLogType, setCurrentLogType] = useState(-1);
  const [logs, setLogs] = useState([]);

  const getLogs = async (currentLogType) => {
    if (currentLogType < 0) {
      setLogs([]);
      return;
    }
    const { data } = await api.post("/logger/get/", {
      loggerId: currentLogType,
    });

    setLogs(data);
  };

  useEffect(() => {
    // getLogs();
  }, []);

  useEffect(() => {
    getLogs(currentLogType);
  }, [currentLogType]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0, y: 0 }}
      style={{ overflow: "hidden" }}
      className="mt-2"
    >
      <div>
        <div className="flex items-center gap-2 mb-4 ">
          <div>Log type:</div>
          <div>
            <Select
              value={currentLogType}
              size="sm"
              onChange={(e) => {
                setCurrentLogType(parseInt(e.target.value));
              }}
            >
              <option value={-1}>-- Select log type --</option>
              {logsTypes &&
                logsTypes.map((item) => {
                  return <option value={item.id}>{item.name}</option>;
                })}
            </Select>
          </div>
          <div>
            <Button
              size="xs"
              colorScheme="red"
              onClick={() => {
                api.delete("logger/delete", {});
              }}
            >
              Delete logs (TESTING)
            </Button>
          </div>
        </div>

        <div>
          <Loglist logs={logs} />
        </div>
      </div>
    </motion.div>
  );
};

export default SystemLogs;
