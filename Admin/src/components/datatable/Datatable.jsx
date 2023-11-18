import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../../hooks/UseFetch";

const Datatable = ({ columns }) => {
  // console.log(columns);
  const [list, setList] = useState([]);

  // useEffect(() => {
  //   setList(data);
  //   console.log(data);
  // }, [data]);

  // const handleGet = async () => {
  //   try {
  //     const data = await fetch("/order/get", { method: "GET" });
  //     setList(data);
  //   } catch (error) {}
  // };

  const fetchOrderData = useCallback(() => {
    axios(`/order/get`).then((data) => {
      const orderData = data?.data;
      if (!!orderData) {
        setList(orderData);
        // console.log(userData);
      }
    });
  }, []);

  useEffect(() => {
    fetchOrderData();
  }, [fetchOrderData]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/order/delete/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const handleView = async (id) => {
    try {
      await axios.get(`/order/get/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {/* {path} */}
        <Link to={`/order/get/export-xlsx`} className="link">
          Action
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
