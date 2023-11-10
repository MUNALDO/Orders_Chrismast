import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/UseFetch";

const SingleStock = () => {
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
//   console.log(data);

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
                    <span className="itemKey">Code:</span>
                    <span className="itemValue">{item.code}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Unit:</span>
                    <span className="itemValue">{item.unit}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Quantity:</span>
                    <span className="itemValue">{item.quantity}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Price:</span>
                    <span className="itemValue">{item.Price}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Status:</span>
                    <span className="itemValue">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SingleStock;
