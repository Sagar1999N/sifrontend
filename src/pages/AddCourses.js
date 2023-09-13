import { Button, Col, DatePicker, Form, Input, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import "antd/dist/antd.css";
import { format } from "date-fns";
import { URL } from "../helper";

function AddCourses() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `"${URL}"/api/user/add-course"`,
        {
          name: values.name,
          level: values.level,
          description: values.description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/courses");
      }
    } catch (error) {
      toast.error("Error adding course");
      dispatch(hideLoading());
    }
  };

  return (
    <Layout>
      <div>
        <h1>Add Course</h1>
        <Form
          name="bookAppointmentForm"
          onFinish={onFinish}
          initialValues={{
            name: "",
            level: "",
            description: "",
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter course name",
              },
            ]}
          >
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your course name"
            />
          </Form.Item>

          <Form.Item
            label="Level"
            name="level"
            rules={[
              {
                required: true,
                message: "Please enter level",
              },
            ]}
          >
            <Input
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              placeholder="Enter level"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter Description",
              },
            ]}
          >
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter the Description"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}

export default AddCourses;
