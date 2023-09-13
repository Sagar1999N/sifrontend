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
require("dotenv").config();
const URL = process.env.BASE_URL;

function BookAppointment() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [course, setCourse] = useState("");
  const [starts, setStarts] = useState(null);
  const [ends, setEnds] = useState(null);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `'${URL}'/api/user/schedule-lecture`,
        {
          name: values.name,
          instructor: values.instructor,
          course: values.course,
          starts: values.starts,
          ends: values.ends,
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
        navigate("/admin/lectures");
      }
    } catch (error) {
      toast.error("Error scheduling lecture");
      dispatch(hideLoading());
    }
  };

  return (
    <Layout>
      <div>
        <h1>Schedule Lecture</h1>
        <Form
          name="bookAppointmentForm"
          onFinish={onFinish}
          initialValues={{
            name: "",
            instructor: "",
            course: "",
            starts: null,
            ends: null,
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
            ]}
          >
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </Form.Item>

          <Form.Item
            label="Instructor"
            name="instructor"
            rules={[
              {
                required: true,
                message: "Please enter instructor's name",
              },
            ]}
          >
            <Input
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              placeholder="Enter instructor's name"
            />
          </Form.Item>

          <Form.Item
            label="Course"
            name="course"
            rules={[
              {
                required: true,
                message: "Please enter the course name",
              },
            ]}
          >
            <Input
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Enter the course name"
            />
          </Form.Item>

          <Form.Item
            label="Starts"
            name="starts"
            rules={[
              {
                required: true,
                message: "Please select the start date and time",
              },
            ]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              value={starts}
              onChange={(date) => setStarts(date)}
            />
          </Form.Item>

          <Form.Item
            label="Ends"
            name="ends"
            rules={[
              {
                required: true,
                message: "Please select the end date and time",
              },
            ]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              value={ends}
              onChange={(date) => setEnds(date)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Book Now
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}

export default BookAppointment;
