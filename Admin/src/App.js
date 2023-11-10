import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { doctorInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
// import { AuthContext } from "./context/AuthContext";
import { ordersColumns } from "./datatablesource";
import SingleDoctor from "./pages/singleDoctor/SingleDoctor";
import Export from "./pages/export_xlsx/Export";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  // const ProtectedRoute = ({ children }) => {
  //   const { user } = useContext(AuthContext);

  //   if (!user) {
  //     return <Navigate to="/loginUser" />;
  //   }

  //   return children;
  // };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="loginUser" element={<Login />} />
            <Route
              index
              element={
                // <ProtectedRoute>
                  <Home />
                // </ProtectedRoute>
              }
            />
            {/* <Route path="users/get">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="users/get/:userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New Patient" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update/:userId"
                element={
                  <ProtectedRoute>
                    <UpdateUser inputs={userInputs} title="Update Patient" />
                  </ProtectedRoute>
                }
              />
            </Route> */}
            <Route path="order/get">
              <Route
                index
                element={
                  // <ProtectedRoute>
                    <List columns={ordersColumns} />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="export-xlsx"
                element={
                    <Export title="Export Excel" />
                }
              />
            </Route>
            {/* <Route path="doctors/get">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={doctorColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="doctors/get/:doctorId"
                element={
                  <ProtectedRoute>
                    <SingleDoctor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewDoctor inputs={doctorInputs} title="Add New Doctor" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update/:doctorId"
                element={
                  <ProtectedRoute>
                    <UpdateDoctor inputs={userInputs} title="Update Doctor" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="booking/get">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={bookingColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="booking/get/:bookingId"
                element={
                  <ProtectedRoute>
                    <SingleBooking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewBooking inputs={BookingInputs} title="Add New Booking" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="stocks/get">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={stockColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="stocks/get/:stockId"
                element={
                  <ProtectedRoute>
                    <SingleStock />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewStock inputs={stockInputs} title="Add New Stock" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update/:stockId"
                element={
                  <ProtectedRoute>
                    <UpdateStock inputs={stockInputs} title="Update Stock" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="equipments/get">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={equipmentColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="equipments/get/:equipmentId"
                element={
                  <ProtectedRoute>
                    <SingleEquipment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewEquipment inputs={equipmentInputs} title="Add New Equipment" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update/:equipmentId"
                element={
                  <ProtectedRoute>
                    <UpdateEquipment inputs={equipmentInputs} title="Update Equipment" />
                  </ProtectedRoute>
                }
              />
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
