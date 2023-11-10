import "./updateDoctor.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useEffect } from "react";

const UpdateDoctor = ({ inputs, title }) => {
  const location = useLocation();
  const orgPath = location.pathname.split("/")[1];
  const path = location.pathname.split("/")[4];
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  //   console.log(orgPath);
  //   console.log(path);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const [userData, setUserData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchUserData = useCallback(() => {
    if (path) {
      axios(`/doctors/get/${path}`).then((data) => {
        const userData = data?.data;
        if (userData) {
          setUserData(userData);
          // console.log(userData);
        }
      });
    }
  }, [path]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Function to handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handlePhotoUpload = (e) => {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("photo", selectedFile);

      axios
        .post(`/uploads/photo-doctor/${path}`, formData)
        .then((response) => {
          if (response.data) {
            console.log("Photo uploaded successfully!");
            setUserData((prevData) => ({
              ...prevData,
              photo: response.data.photo,
            }));
          }
        })
        .catch((error) => {
          console.error("Error uploading photo: ", error);
        });
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      // const uploadRes = await axios.post(
      //   "https://api.cloudinary.com/dcvvnmwby/image/upload",
      //   data
      // );

      // const { url } = uploadRes.data;

      const updateDoctor = {
        ...info,
        // photo: url,
      };
      // console.log(newUser);

      await axios.put(`/doctors/update/${path}`, updateDoctor);
      if (updateDoctor) {
        navigate(`/${orgPath}/get`);
      } else {
        navigate(`/${orgPath}/get/update/${path}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                userData.photo
                  ? `/${userData.photo}`
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt={userData.name}
              className="avaImg"
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="fileInput"
                />
                <button onClick={handlePhotoUpload} className="upload-button">
                  Upload Photo
                </button>
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDoctor;
