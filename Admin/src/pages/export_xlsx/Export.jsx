import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Export = ({ title }) => {
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://orders-chrismast-ten.vercel.app/api/order/export-xlsx", { method: "POST" });

      if (response.ok) {
        // Trigger download by creating a Blob and using the URL.createObjectURL
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "orders.xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        console.log("Export successful");
      } else {
        console.error(`Export failed with status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error exporting:", err);
    }
  };

  return (
    <div className="new">
      {/* <Sidebar /> */}
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <button onClick={handleClick}>Export</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Export;
