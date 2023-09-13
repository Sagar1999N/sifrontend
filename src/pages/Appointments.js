import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/admin/get-all-lectures", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Lecture",
      dataIndex: "name",
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
      render: (text, record) => <span>{record.lectureInfo.instructor}</span>,
    },
    {
      title: "Course",
      dataIndex: "course",
      render: (text, record) => <span>{record.lectureInfo.course}</span>,
    },
    {
      title: "Starts",
      dataIndex: "starts",
      render: (text, record) => (
        <span>
          {moment(record.lectureInfo.starts).format("YYYY-MM-DD HH:mm:ss")}
        </span>
      ),
    },
    {
      title: "Ends",
      dataIndex: "ends",
      render: (text, record) => (
        <span>
          {moment(record.lectureInfo.ends).format("YYYY-MM-DD HH:mm:ss")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  useEffect(() => {
    getAppointmentsData();
  }, []);
  return (
    <Layout>
      <h1 className="page-title">Lectures</h1>
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
}

export default Appointments;
