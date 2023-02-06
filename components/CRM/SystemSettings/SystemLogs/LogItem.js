import Reac, { useEffect } from "react";
import moment from "moment";

const getColor = (log) => {
  switch (log.statusCode) {
    case 201: {
      return "text-green-700";
    }
    case 401: {
      return "text-red";
    }
    case 300: {
      return "text-red";
    }
  }
};

const LogItem = ({ log, answers }) => {
  useEffect(() => {
    console.log(log);
  });
  return (
    <div className="flex items-center gap-5 border-b-2 p-1">
      <div>{moment(log.createdAt).format("DD-MM-YY HH:mm")}</div>
      <div>{log.statusCode}</div>
      <div className={` ${getColor(log)}`}>{answers[log.descriptionId]}</div>
    </div>
  );
};

export default LogItem;
