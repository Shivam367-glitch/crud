import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import useInput from "../../hooks/useInput";
import { toast } from "react-toastify";
import {generateFormGroups, validate} from "../../utility/utility";
import Spinners from "../../components/Spinner/Spinners";
import { registerUser } from "../../services/Apis";
import { addData } from "../../components/Context/ContextProvider";
const Register = () => {
  const navigate = useNavigate();
  const inputFields = useInput({FirstName: "",LastName: "",Mobile: "",Email: "",Location: "",Gender: ""});
  const { useradd, setUseradd } = useContext(addData);
  const [showSpin, setShowSpin] = useState(true);
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState({value:"Active",label:"Active"});
  const [image, setImage] = useState("");

  useEffect(() => {
    document.title="Register User"
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);

  const handleSumit = async (e) => {
    e.preventDefault();
    let { FirstName, LastName, Mobile, Email, Location, Gender } =inputFields.value;
   if(!validate(FirstName, LastName, Mobile, Email, Location, Gender,status.value,image)){
    return;
   }
    else {
      try {
        const formData = new FormData();
        formData.append("FirstName", FirstName);
        formData.append("LastName", LastName);
        formData.append("Email", Email);
        formData.append("Mobile", Mobile);
        formData.append("Gender", Gender);
        formData.append("Status", status.value);
        formData.append("Profile", image);
        formData.append("Location", Location);

        const header = {
          "Content-Type": "multipart/form-data",
        };
        const res = await registerUser(formData, header);
        if (res.status === 200) {
          inputFields.reset();
          setImage("");
          setStatus({value:"",label:""});
          setUseradd(res.data.data);
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/");
          }, 1200);
        } else {
          toast.error(
            res.response?.data?.message || res.message || "Registration failed"
          );
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    }
  };
  return (
    <>
      {showSpin ? (
        <Spinners />
      ) : (
        <div className="container">
          <h2 className="text-center">Register User</h2>
          <Card className="shadow mt-3 p-3">
            <div className="profile text-center">
              <img src={preview ? preview : "logo512.png"} alt="img" />
            </div>
            <Form onSubmit={handleSumit} id="myForm">
              <Row>
                {generateFormGroups(inputFields,status,image,setImage,setStatus,setPreview)}
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
        </div>
      )}
    </>
  );
};

export default Register;
