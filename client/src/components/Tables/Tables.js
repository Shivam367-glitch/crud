import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Badge } from "react-bootstrap";
import DropdownComponent from "../Dropdown/dropdown";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/baseUrl";
import Paginations from "../Pagination/Paginations";
import { statusChange } from "../../services/Apis";
import { toast } from "react-toastify";
const Tables = ({allUsers,deleteUser,currentPage,totalPages,onPageChange,}) => {
  let navigate = useNavigate();
  const filterByOptions = ["Active", "InActive"];
  const actionOptions = ["View", "Edit", "Delete"];
  const [users, setUsers] = useState([]);
  const handleStatusSelect = async (selectedStatus, rowId, row_id) => {
    try {
      const response = await statusChange(selectedStatus, row_id);
      if (response.status === 200) {
        toast.success(
          `${response.data.data.FirstName} ${response.data.message}`
        );
        setUsers((prevUsers) => {
          const updatedUsers = [...prevUsers];
          updatedUsers[rowId].Status = selectedStatus;
          return updatedUsers;
        });
      } else {
        toast.error(
          response.response?.data?.message ||
            response.message ||
            "Error While Updating Status!"
        );
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleActionSelect = async (action, rowId) => {

    if (action === "Edit") {
      navigate(`/${action.toLowerCase()}/${rowId}`);
    } else if (action === "View") {
      navigate(`/profile/${rowId}`);
    } else {
      await deleteUser(rowId);
    }
  };
  useEffect(() => {
    setUsers(allUsers);
  }, [allUsers]);

  return (
    <>
      <div className="container">
        <Row>
          <Col className="mt-0">
            <Card className="shadow">
              <Table className="align-items-center" responsive="lg" striped bordered hover>
                <thead>
                  <tr>
                    <th className="text-nowrap">ID</th>
                    <th className="text-nowrap">Full Name</th>
                    <th className="text-nowrap">Email</th>
                    <th className="text-nowrap">Gender</th>
                    <th className="text-nowrap">Status</th>
                    <th className="text-nowrap">Profile</th>
                    <th className="text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.length > 0 ? (
                    allUsers.map((user, index) => (
                      <tr key={user._id}>
                        <td className="text-nowrap">{index + 1 + (currentPage - 1) * 4}</td>
                        <td className="text-nowrap">{user.FirstName} {user.LastName}</td>
                        <td className="text-nowrap">{user.Email}</td>
                        <td className="text-nowrap">{user.Gender === "Male" ? "M" : "F"}</td>
                        <td>
                          <DropdownComponent options={filterByOptions} onSelect={(selectedStatus) => handleStatusSelect(selectedStatus, index, user._id)}
                            selectedValue={<Badge bg={user.Status === "Active" ? "primary" : "danger"}>{user.Status}{" "}<i className="fa-solid fa-angle-down"></i></Badge>}/>
                        </td>
                        <td className="text-nowrap list_img">
                          <img src={`${user.Profile.path}`} alt={`img-${user.FirstName}`}></img>
                        </td>
                        <td>
                          <DropdownComponent options={actionOptions} onSelect={(action) => handleActionSelect(action, user._id)} selectedValue={<i className="fa-solid fa-ellipsis-vertical"></i>}/>
                        </td>
                      </tr>
                    ))
                  ) : (<div className="ms-2">No Record Found</div>)}
                </tbody>
              </Table>
                  <Paginations currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages}></Paginations>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Tables;
