import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../../hooks/UseFetch";

const Datatable = ({ columns }) => {
  // console.log(columns);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  // console.log(path);
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch("/order/get");

  useEffect(() => {
    setList(data);
    console.log(data);
  }, [data]);

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
        {path}
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
