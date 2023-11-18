import List from "./pages/list/List";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { doctorInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
// import { AuthContext } from "./context/AuthContext";
import { ordersColumns } from "./datatablesource";
import Export from "./pages/export_xlsx/Export";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/order">
            <Route
              index
              element={
                <List columns={ordersColumns} />
              }
            />
            <Route
              path="export-xlsx"
              element={
                <Export title="Export Excel" />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
