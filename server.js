const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const lodash = require("lodash");

const app = express();

app.use(express.json());

app.get("/api/workouts", function (req, res) {
  const data = fs.readFileSync("workouts.json", "utf8");
  const workouts = JSON.parse(data);
  res.send(workouts);
});

app.post("/api/workouts", function (req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }

  const { newWorkout } = req.body;

  const data = fs.readFileSync("workouts.json", "utf8");
  const workouts = JSON.parse(data);

  const match = lodash.find(workouts, { id: newWorkout.id });
  if (match) {
    res.sendStatus(404);
  } else {
    newWorkout.id = +workouts[workouts.length - 1].id + 1;
    workouts.push(newWorkout);
  }

  const newData = JSON.stringify(workouts);

  fs.writeFileSync("workouts.json", newData);
  res.sendStatus(200);
});

app.put("/api/workouts", function (req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }

  const {editedWorkout} = req.body;

  const data = fs.readFileSync("workouts.json", "utf8");
  const workouts = JSON.parse(data);

  const match = lodash.find(workouts, { id: editedWorkout.id });
  if (match) {
    const index = lodash.indexOf(
      workouts,
      lodash.find(workouts, { id: editedWorkout.id })
    );
    workouts.splice(index, 1, editedWorkout);
  } else {
    res.sendStatus(404);
  }

  const newData = JSON.stringify(workouts);

  fs.writeFileSync("workouts.json", newData);
  res.sendStatus(200);
});

app.delete("/api/workouts/:id", function (req, res) {
  const id = req.params.id;
  const data = fs.readFileSync("workouts.json", "utf8");
  const workouts = JSON.parse(data);

  const workoutsAfterDelete = workouts.filter((item) => item.id != id);

  if (workouts.length !== workoutsAfterDelete.length) {
    fs.writeFileSync("workouts.json", JSON.stringify(workoutsAfterDelete));
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(9999, function () {
  console.log("Сервер ожидает подключения...");
});
