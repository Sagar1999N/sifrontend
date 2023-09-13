import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
require("dotenv").config();
const URL = process.env.BASE_URL;

function Courses() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get(`"${URL}"/api/admin/get-all-courses`, {
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

  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        "/api/doctor/change-appointment-status",
        { appointmentId: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      //render: (text, record) => <span>{record.lectureInfo.name}</span>,
    },
    {
      title: "Level",
      dataIndex: "level",
      //render: (text, record) => <span>{record.lectureInfo.instructor}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      //render: (text, record) => <span>{record.lectureInfo.course}</span>,
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      // render: (text, record) => (
      //   <span>
      //     {moment(record.lectureInfo.starts).format("DD-MM-YYYY")}{" "}
      //     {moment(record.lectureInfo.starts).format("HH:mm")}
      //   </span>
      // ),
    },
  ];
  useEffect(() => {
    getAppointmentsData();
  }, []);
  return (
    <Layout>
      <h1 className="page-header">Courses</h1>
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
}

export default Courses;
