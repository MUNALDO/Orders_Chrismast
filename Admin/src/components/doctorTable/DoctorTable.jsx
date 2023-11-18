import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetch from "../../hooks/UseFetch";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DoctorList = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[5];
  //   console.log(path);
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/booking/get-doctor/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Booking ID</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">User</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Booking Status</TableCell>
            <TableCell className="tableCell">Treatment Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="tableCell">{item._id}</TableCell>
              {/* <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell> */}
              <TableCell className="tableCell">
                {new Date(item.appointmentDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="tableCell">{item.user_name}</TableCell>
              {/* <TableCell className="tableCell">{item.doctor_specialization}</TableCell> */}
              <TableCell className="tableCell">{item.ticketPrice}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${item.booking_status}`}>
                  {item.booking_status}
                </span>
              </TableCell>
              <TableCell className="tableCell">
                <span className={`status ${item.treatment_status}`}>
                  {item.treatment_status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DoctorList;
