import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/UseFetch";
import DoctorList from "../../components/doctorTable/DoctorTable";

const SingleDoctor = () => {
  const location = useLocation();
  const orgPath = location.pathname.split("/")[1];
  const path = location.pathname.split("/")[5];
  // console.log(orgPath);
  // console.log(path);
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${orgPath}/get/${path}`);
  // console.log(data._id);
  const result = [];
  result.push(data);
  // console.log(result);

  useEffect(() => {
    setList(data);
  }, [data]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">
              <Link to={`/${orgPath}/get/update/${path}`} className="link">
                Update
              </Link>
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
            <img src={`/${data.photo}`} alt="" className="itemImg" />
              {result.map((item) => (
                <div className="details" key={item._id}>
                  <h1 className="itemTitle">{item.name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{item.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{item.phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Specialization:</span>
                    <span className="itemValue">{item.specialization}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Price:</span>
                    <span className="itemValue">{item.ticketPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Booking</h1>
          <DoctorList />
        </div>
      </div>
    </div>
  );
};

export default SingleDoctor;
