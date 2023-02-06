import React, { useState, useEffect } from "react";

import LogItem from "./LogItem";
import { logsTypes, logsAnswer } from "json-data/logs";
const Loglist = ({ logs }) => {
  const [desc, setDesc] = useState([]);
  useEffect(() => {}, []);
  return (
    <div>
      <div>
        {logs &&
          logs.map((log) => {
            const ans = logsAnswer(log);
            return <LogItem key={log._id} log={log} answers={ans} />;
          })}
      </div>
    </div>
  );
};

export default Loglist;
