import React, { useState } from "react";
import lodash from "lodash";

import { Table, Button, Popconfirm } from "antd";
import ButtonGroup from "antd/lib/button/button-group";

import ModalForm from "../modalForm/modalForm";

import { useDispatch } from "react-redux";
import {
  deleteWorkoutById,
  addNewWorkout,
  editWorkouts,
} from "../../redux/actionCreator";

const TrainingTable = ({ data }) => {
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);
  const [addFormIsOpen, setAddFormIsOpen] = useState(false);

  const dispatch = useDispatch();

  const emptyFormData = {
    id: "",
    workoutType: "",
    distance: "",
    date: "",
    comment: "",
  };

  const [formData, setFormData] = useState(emptyFormData);

  const handleAdd = () => {
    setAddFormIsOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteWorkoutById(id));
  };

  const handleOk = (objFromForm) => {
    const newData = [...data];
    const newObj = { ...objFromForm };

    const match = lodash.find(newData, { id: newObj.id });
    if (match) {
      const index = lodash.indexOf(
        newData,
        lodash.find(newData, { id: newObj.id })
      );
      newData.splice(index, 1, newObj)
      dispatch(editWorkouts(newData));
    } else {
      newObj.id = newData[newData.length-1].id + 1;
      newData.push(newObj);
      dispatch(addNewWorkout(newObj));
    }
    setAddFormIsOpen(false);
    setEditFormIsOpen(false);
  };

  const columns = [
    {
      title: "WorkoutType",
      dataIndex: "workoutType",
      key: "workoutType",
      filters: [
        {
          text: "Bicycling",
          value: "bicycling",
        },
        {
          text: "Running",
          value: "running",
        },
        {
          text: "Walking",
          value: "walking",
        },
        {
          text: "Skiing",
          value: "skiing",
        },
      ],
      onFilter: (value, record) => record.workoutType.indexOf(value) === 0,
    },
    {
      title: "Distance",
      dataIndex: "distance",
      key: "distance",
      render: (distance) => <>{distance} km.</>,
      sorter: (a, b) => a.distance - b.distance,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => Date.parse(a.date) - Date.parse(b.date),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, row) => {
        return (
          <ButtonGroup>
            <Button onClick={() => setEditFormIsOpen(true)} type="primary">
              Edit
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(row.id)}
            >
              <Button type="danger">Delete</Button>
            </Popconfirm>
          </ButtonGroup>
        );
      },
    },
  ];

  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 4 }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => setFormData({ ...record }),
          };
        }}
      />
      <ModalForm
        title="Edit workout session"
        isOpen={editFormIsOpen}
        handleOk={handleOk}
        handleCancel={() => setEditFormIsOpen(false)}
        data={formData}
        values={formData}
      />
      <ModalForm
        title="Add workout session"
        isOpen={addFormIsOpen}
        handleOk={handleOk}
        handleCancel={() => setAddFormIsOpen(false)}
        values={emptyFormData}
      />
    </div>
  );
};

export default TrainingTable;
