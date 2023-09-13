import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import Doctor from "../components/Doctor";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
function Home() {
  const [doctors, setDoctors] = useState([]);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading());
      if (user.isAdmin) {
        const response = await axios.get("/api/admin/get-all-lectures", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        dispatch(hideLoading());
        if (response.data.success) {
          setDoctors(response.data.data);
        }
      } else {
        const response = await axios.get(
          `/api/user/get-lectures-by-instructor-id/'${user._id}'`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
          setDoctors(response.data.data);
        }
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <Row gutter={20}>
        {doctors.map((doctor) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Home;
