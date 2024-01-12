import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import useInput from "../../hooks/useInput";
import { toast } from "react-toastify";
import Spinners from "../../components/Spinner/Spinners";
import {generateFormGroups, validate} from "../../utility/utility";
import { useNavigate} from "react-router-dom";
import { UpdateUser, getSingleUser } from "../../services/Apis";
const Edit = () => {
  let formInputs = useInput({FirstName: "",LastName: "",Mobile: "",Email: "",Location: "",Gender: "",});
  const navigate = useNavigate();
  const [imgdata, setImgdata] = useState("");
  const [showSpin, setShowSpin] = useState(true);
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState({value:"",label:""});
  const [image, setImage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (image) {
      setImgdata("");
      setPreview(URL.createObjectURL(image));
    }
  }, [image]);

  const fetchUser = async (id) => {
    setShowSpin(true);
    try {
      const res = await getSingleUser(id);
      if (res.status === 200) {
        formInputs.setValue((pre) => {
          return { ...pre, ...res.data.data[0] };
        });

        setStatus({
          value: res.data.data[0]["Status"],
          label: res.data.data[0]["Status"],
        });
        setImgdata(res.data.data[0].Profile);
        
      }
    } catch (error) {
      console.log(error);
    }finally{
      setShowSpin(false);
    }
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    let { FirstName, LastName, Mobile, Email, Location, Gender } = formInputs.value;
    if(!validate(FirstName, LastName, Mobile, Email, Location, Gender,status.value,image||imgdata)){
      return;
     } else {
      try {
        const formData = new FormData();

        formData.append("FirstName", FirstName);
        formData.append("LastName", LastName);
        formData.append("Email", Email);
        formData.append("Mobile", Mobile);
        formData.append("Gender", Gender);
        formData.append("Status", status.value);
        formData.append("Profile", image || imgdata);
        formData.append("Location", Location);

        const header = {
          "Content-Type": "multipart/form-data",
        };
        const res = await UpdateUser(id, formData, header);
        if (res.status === 200) {
          formInputs.reset();
          setImage("");
          setStatus({value:"",label:""});
          toast.success(res.data.message);
          formInputs.reset();
          setTimeout(() => {
            navigate("/");
          }, 1200);
        } else {
          toast.error(
            res.response?.data?.message || res.message || "Update failed"
          );
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    }
  };
  useEffect(() => {
    document.title="Update Details"
  }, []);

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  return (
    <>
      {showSpin ? (
        <Spinners className="mt-5" />
      ) : (
        <div className="container">
          <h2 className="text-center">Update User Details</h2>
          <Card className="shadow mt-3 p-3">
            <div className="profile text-center">
              <img src={image ? preview : `${imgdata.path}`} alt="img"/>
            </div>
            <Form onSubmit={handleSumit}>
              <Row>
                {generateFormGroups(formInputs,status,image,setImage,setStatus,setPreview)}
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

export default Edit;
