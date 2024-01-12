import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { addData } from "../../components/Context/ContextProvider";
import Tables from "../../components/Tables/Tables";
import Spinners from "../../components/Spinner/Spinners";
import { usersList, userDelete, exportToCsv } from "../../services/Apis";
import { toast } from "react-toastify";
import FilterOptions from "../../components/FilterOptions/FilterOptions";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
  let navigate = useNavigate();

  const [showSpin, setShowSpin] = useState(true);
  const { useradd, setUseradd } = useContext(addData);
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({search: "",gender: "All",status: "All",sort: "New"});
  const [totalPage, setTotalPage] = useState(0);


  const getAllUsers = async () => {
    setShowSpin(true);
    try {
      const response = await usersList(filters.search, filters.gender, filters.status, filters.sort, currentPage);
      if (response.status === 200) {
        setAllUsers(response.data.data);
        setTotalPage(response.data.totalPages);
      } else {
        toast.error(response.response?.data?.message || response.message || "Error!");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setShowSpin(false);
    }
  };
  

  const deleteUser = async (id) => {
    try {
      const response = await userDelete(id);
      if (response.status === 200) {
        getAllUsers();
        toast.success(`${response.data.data.FirstName} ${response.data.message}`);
      } else {
        toast.error(response.response?.data?.message || response.message || "Error!");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handlePageChange = async (newPage, button) => {
    if (button === "pre") {
      setCurrentPage((prevPage) => {
        if (prevPage === 1) return prevPage;
        return prevPage - 1;
      });
    } else if (button === "next") {
      setCurrentPage((prevPage) => {
        if (prevPage === totalPage) return prevPage;
        return prevPage + 1;
      });
    } else {
      setCurrentPage(newPage);
    }
  };
  const exportCSV = async () => {
    try {
      const response = await exportToCsv();
      if (response.status === 200) {
        window.open(response.data.downloadUrl, "blank");
      } else {
        toast.error(response.response?.data?.message || response.message || "Error!");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  
  const SortByValue = (e) => {
    console.log(e);
    setCurrentPage(1);
    setFilters((prevFilters) => ({ ...prevFilters, sort: e }));
  };

 

  const filter_By_Gender = async (value) => {
    setCurrentPage(1);
    setFilters((prevFilters) => ({ ...prevFilters, gender: value }));
  };

 
  const filter_By_Status = async (value) => {
    setCurrentPage(1);
    setFilters((prevFilters) => ({ ...prevFilters, status: value }));
  };

  const search_By_Name = async (value) => {
    setCurrentPage(1);
    setFilters((prevFilters) => ({ ...prevFilters, search: value }));
  };

  useEffect(() => {
    document.title="CRUD"
    getAllUsers();
  }, [filters, currentPage]);

  return (
    <>
      {useradd ? (
        <Alert variant="success" onClose={() => setUseradd("")} dismissible>
          {`${useradd.FirstName.toUpperCase()} Successfully Added `}
        </Alert>
      ) : ''}
      <div className="container">
        <div className="main_div">
          <div className="search_add mt-4 d-flex justify-content-between">
            <SearchBar onSearchChange={(value) => search_By_Name(value)} />
            <div className="add_btn">
              <Button variant="primary" onClick={() => navigate("/register")}>
                <i className="fa-solid fa-plus"></i>&nbsp; Add User
              </Button>
            </div>
          </div>
          <FilterOptions exportCSV={exportCSV} gender={filters.gender} onGenderChange={(value) => filter_By_Gender(value)} SortByValue={SortByValue} status={filters.status} onStatusChange={(value) => filter_By_Status(value)}/>
        </div>
        {showSpin ? <Spinners /> : <Tables allUsers={allUsers} deleteUser={deleteUser} currentPage={currentPage} totalPages={totalPage} onPageChange={handlePageChange} />}
      </div>
    </>
  );
};

export default Home;
