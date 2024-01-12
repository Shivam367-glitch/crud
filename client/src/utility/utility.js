import React from 'react'
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { toast } from 'react-toastify';
 const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  const formFields = [
    { name: "FirstName", label: "First Name", type: "text", placeholder: "Enter First Name" },
    { name: "LastName", label: "Last Name", type: "text", placeholder: "Enter Last Name" },
    { name: "Email", label: "Email", type: "email", placeholder: "Enter Email" },
    { name: "Mobile", label: "Mobile", type: "text", placeholder: "Enter Mobile" },
    {
      name: "Gender",
      label: "Select Your Gender",
      type: "radio",
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
      ],
    },
    { name: "Status", label: "Select Your Status", type: "select" },
    { name: "Profile", label: "Select Your Profile", type: "file" ,accept: "image/*"},
    { name: "Location", label: "Enter Your Location", type: "text", placeholder: "Enter Location" },
  ];

export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const mobile =/^[0-9]{10}$/;
  const handleStatus=(e,setStatus)=>{
    console.log(e);
    setStatus(e)
  }
  const  handleProfile=(e,setImage,setPreview)=>{

    setImage(e.target.files[0]);
    if(e.target.files[0]){
      setPreview(URL.createObjectURL(e.target.files[0]))
    }
  }
   export const generateFormGroups = (inputFields,status,image,setImage,setStatus,setPreview) => {
  
      return formFields.map((field) => (
        <Form.Group
          key={field.name}
          className={`mb-3 col-lg-6`}
          controlId={`exampleForm.ControlInput1`}
        >
          <Form.Label>{field.label}</Form.Label>
          {field.type === "radio" ? (
            <>
              <Form.Check
                type={field.type}
                label={field.options[0].label}
                name={field.name}
                value={field.options[0].value}
                onChange={inputFields.onChange}
                checked={inputFields.value.Gender===field.options[0].value}
              />
              <Form.Check
                type={field.type}
                label={field.options[1].label}
                name={field.name}
                value={field.options[1].value}
                onChange={inputFields.onChange}
                checked={inputFields.value.Gender===field.options[1].value}
              />
            </>
          ) : field.type === "select" ? (
            <Select
              defaultValue={status}
              onChange={(e)=>{handleStatus(e,setStatus)}}
              options={options}
            />
          ) : field.name === "Profile" ? (
            <Form.Control
            type={field.type}
            placeholder={field.placeholder}
            name={field.name}
            accept={field.accept}
            defaultValue={image}
            onChange={(e)=>{handleProfile(e,setImage,setPreview)}}
          />
          ):
           (
            <Form.Control
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              value={inputFields.value[field.name]}
              onChange={inputFields.onChange}
            />
          )}
        </Form.Group>
      ));
    };

   export const statusOptions = [
      { id: 'All', label: 'All', value: 'All' },
      { id: 'Active', label: 'Active', value: 'Active' },
      { id: 'InActive', label: 'InActive', value: 'InActive' },
    ];

    export const genderOptions = [
      { id: 'All', label: 'All', value: 'All' ,extra:"oppp"},
      { id: 'Male', label: 'Male', value: 'Male',extra:"Male" },
      { id: 'Female', label: 'Female', value: 'Female',extra:"Female" },
    ];

    export const socailHandles = [
      {
        href: "https://www.linkedin.com/in/shivam-mishra-8aba7b179",
        iconName:"fa-solid fa-brands fa-linkedin-in fa-fw text-white"
      }, {
        href: "https://twitter.com/Shivamm3213",
        iconName: "fa-solid fa-brands fa-twitter fa-fw text-white"
      }, {
        href: "https://m.facebook.com/profile.php?id=100011628730183",
        iconName: "fa-solid fa-brands fa-facebook-f fa-fw text-white"
      },  {
        href: "https://smishraportfolio.netlify.app",
        iconName: "fa-solid fa-globe fa-fw text-white"
      }, {
        href: "https://www.instagram.com/txt2shivam",
        iconName: "fa-solid fa-brands fa-instagram fa-fw text-white"
      },
    ]

export const year=new Date().getFullYear()

export  const handleClick=()=>{

window.open('https://smishraportfolio.netlify.app', '_blank');
}

export const validate=(FirstName, LastName, Mobile, Email, Location, Gender,Status,Image )=>{
  if (FirstName === "") {
    toast.error("First Name is Required!");
    return false;
  } else if (LastName === "") {
    toast.error("Last Name is Required!");
    return false;
  } else if (Mobile === "") {
    toast.error("Mobile Number is Required!");
    return false;
  } else if (!mobile.test(Mobile)) {
    toast.error("Enter Valid Mobile!");
    return false;
  } else if (Email === "") {
    toast.error("Email is Required!");
    return false;
  } else if (!emailPattern.test(Email)) {
    toast.error("Enter Valid Email!");
    return false;
  } else if (Location === "") {
    toast.error("Location is Required!");
    return false;
  } else if (Gender === "") {
    toast.error("Gender is Required!");
    return false;
  } else if (Status === "") {
    toast.error("Status is Required!");
    return false;
  } else if (Image === "") {
    toast.error("Image is Required!");
    return false;
  } else{
   return true;
  }
}
  