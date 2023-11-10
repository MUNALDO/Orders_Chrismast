import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/UseFetch";

const SingleBooking = () => {
  const location = useLocation();
  const orgPath = location.pathname.split("/")[1];
  const path = location.pathname.split("/")[5];
  // console.log(orgPath);
  // console.log(path);
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${orgPath}/get/${path}`);
  // console.log(data);
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
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              {/* <img
                src="https://i.ibb.co/MBtjqXQ/no-avatar.gif"
                alt=""
                className="itemImg"
              /> */}
              {result.map((item) => (
                <div className="details" key={item._id}>
                  <h1 className="itemTitle">{item._id}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Date:</span>
                    <span className="itemValue">
                      {new Date(item.appointmentDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Doctor:</span>
                    <span className="itemValue">{item.doctor_name}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Patient:</span>
                    <span className="itemValue">{item.user_name}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Booking Status:</span>
                    <span className="itemValue">{item.booking_status}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Treatment Status:</span>
                    <span className="itemValue">{item.treatment_status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        {/* <div className="bottom">
          <h1 className="title">Last Bookings</h1>
          <List />
        </div> */}
      </div>
    </div>
  );
};

export default SingleBooking;
