import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/baseUrl";
import { getSingleUser } from "../../services/Apis";
import Spinners from "../../components/Spinner/Spinners";
import { toast } from "react-toastify";
const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [showSpin, setShowSpin] = useState(true);
  const getUserDetails = async (id) => {
    setShowSpin(true);
    const response = await getSingleUser(id);
   try{
    if (response.status === 200) {
      setUser(response.data.data[0]);
    }else {
      toast.error(response.response?.data?.message || response.message || "Error!");
    }
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  } finally {
    setShowSpin(false);
  }
  };
  useEffect(() => {
    if (params.id) {
      getUserDetails(params.id);
    } else {
      navigate("/");
    }
  }, [params.id]);

  return (
    <>
      <Container>
       
        <Card className="card-profile shadow mx-auto mt-5 col-lg-6">
        <Card.Body>
          {showSpin ? (<Spinners />) : user ? (
            <>
              <Row>
                <Col>
                  <div className="card-profile d-flex justify-content-center">
                    <img src={`${user.Profile.path}`} alt="img"/>
                  </div>
                </Col>
              </Row>
              <div className="text-center mt-2">
                  <h3>{user.FirstName+" "+ user.LastName}</h3>
                  <h4>
                    <i className="fa-solid fa-envelope" style={{ color: "#BB001B" }}></i>&nbsp;:- {user.Email}
                  </h4>
                  <h4>
                    <i className="fa-solid fa-mobile" style={{ color: "#a4c639" }}></i>&nbsp;:- {user.Mobile}
                  </h4>
                  <h4>
                    <i className="fa-solid fa-person" style={{ color: "#fa6c5c" }}></i>&nbsp;:- {user.Gender}
                  </h4>
                  <h4>
                    <i className="fa-solid fa-location-pin" style={{ color: "#2cf271" }}></i>&nbsp;:- {user.Location}
                  </h4>
                  <h4>Status &nbsp;:- {user.Status}</h4>
                  <h4>
                    <i className="fa-solid fa-calendar-days" style={{ color: "#4285F4" }}></i>&nbsp;Date Created &nbsp;:- { new Date(user.createdAt).toLocaleString()}
                  </h4>
                  <h4>
                    <i className="fa-solid fa-calendar-days" style={{ color: "#4285F4" }}></i> &nbsp;Date Updated &nbsp;:- {new Date(user.updatedAt).toLocaleString()}
                  </h4>
                </div>
            </>
          ) : (
            <h3>No User Found</h3>
          )}
        </Card.Body>
      </Card>
      </Container>
    </>
  );
};

export default Profile;
