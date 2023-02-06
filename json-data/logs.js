export const logsTypes = [
  {
    id: 0,
    name: "Server logs",
  },
  {
    id: 1,
    name: "Tasks engine",
  },

  {
    id: 2,
    name: "Management",
  },
];

export const logsAnswer = (log) => {
  const answers = {
    0: [
      `Server Started at Port ${log.params[0]}`,
      "Connected to mongoDB",
      "test",
      "Connected to mongoDB",
      "test",
    ],
    1: [
      `Initializing tasks engine`,
      `Setting task schedule for ${log.params[0]} every ${log.params[2]} ${log.params[1]}`,
      `Skipping task ${log.params[0]} because it's inactive`,
      `Starting task ${log.params[0]}`,
      `Stopping task ${log.params[0]}`,
    ],
    2: [
      `${log.params[0]} logged in`,
      `${log.params[0]}  switched active status of task ${log.params[1]} to ${log.params[2]}`,
      `${log.params[0]}  updated interval  times of task ${log.params[1]} `,
      `${log.params[0]}  manually ran task ${log.params[1]} `,
    ],
  };
  const results = answers[log.loggerId.toString()];

  return results;
};
