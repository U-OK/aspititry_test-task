import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Col, Row, Divider } from "antd";

import TrainingTable from "./components/trainingTable/trainingTable";
import Chart from "./components/chart/chart";

import { getWorkoutData } from "./redux/actionCreator";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkoutData());
  }, []);

  const data = useSelector((state) => state.workouts);

  return (
    <>
      <Divider orientation="left">Distance chart</Divider>
      <Row>
        <Col span={14} offset={5}>
          <Chart data={data} />
        </Col>
      </Row>
      <Divider orientation="left">Workout table</Divider>
      <Row>
        <Col span={18} offset={3}>
          <TrainingTable data={data} />
        </Col>
      </Row>
    </>
  );
}

export default App;
