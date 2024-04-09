import React, { useState, useEffect } from "react";
import "../../styles/mix.css";
import { ToastContainer, toast } from "react-toastify";
import { editfunction } from "../../services/Apis";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
const Edit = () => {
    const mobile = window.innerWidth <= 768 ? true : false;
    const [data,setData] = useState({});
  const userValid = ()=>{
    let token = localStorage.getItem("userdbtoken");
    if(!token){
      navigate("/error")
    }
  };
  useEffect(() => {
    if (mobile) window.scrollTo({ top: 1250, left: 100, behavior: "smooth" });
    else window.scrollTo({ top: 800, left: 100, behavior: "smooth" });
     userValid();
     let profile = localStorage.getItem("profile");
     setData(JSON.parse(profile));
  }, []);
  const [passshow, setPassshow] = useState(true);
  const [spin,setSpin] = useState(false);
  const [name,setName] = useState(data.name);
  const [email] = useState(data.email);
  const [password,setPassword] = useState("");
  const [age,setAge] = useState(data.age);
  const [bw,setBw] = useState(data.bw);
  const [height,setHeight] = useState(data.height);
  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    let profile = localStorage.getItem("profile");
     const data=(JSON.parse(profile));
    e.preventDefault();
    if (name === "") {
      toast.error("Enter your Name");
    }else if (( /[0-9]/.test(name))) {
      toast.error("Enter Valid Name");
    } else if (password === "") {
      toast.error("Enter your Password");
    } else if (password.length < 6) {
      toast.error("Password Must be 6 digit");
    } else if (age > 100) {
      toast.error("Enter your Valid Age");
    } else if (age < 10) {
      toast.error("Enter your Valid Age");
    } else if (bw === "") {
      toast.error("Enter your Body Weight");
    } else if (bw > 250 || bw < 15) {
      toast.error("Enter your valid Body Weight");
    } else if (height === "") {
      toast.error("Enter your Height");
    } else if (height > 300 || height < 60) {
      toast.error("Enter your Valid Height");
    } else {
      setSpin(true);
      let data1 = {
        name:name?name:data.name,email:email?email:data.email,password:password,age:age?age:data.age,bw:bw?bw:data.bw,height:height?height:data.height
      }
      console.log(data1)
      const response = await editfunction(data1);
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("profile",JSON.stringify(response.data.userresister));
        toast.success("Edit Succesfull");
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        setSpin(false);
        toast.error(response.response.data.error);
      }
    }
  };
  const handelSubmitfake = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Edit Profile</h1>
            <p>Fill data correctly !</p>
          </div>
          <form action="">
            <div className="form_input">
              <label htmlFor="fname">Change Name</label>
              <input
                type="text"
                name="name"
                id=""
                onChange={(e)=>{setName(e.target.value)}}
                placeholder="enter your Name "
                defaultValue={data.name}
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Change Password</label>
              <div className="two">
                <input
                  type={passshow ? "password" : "text"}
                  name="password"
                  id=""
                  onChange={(e)=>{setPassword(e.target.value)}}
                  placeholder="enter your Password"
                />
                <div
                  className="showpass"
                  onClick={() => {
                    setPassshow(!passshow);
                  }}
                >
                  {passshow ? "Show" : "Hide"}
                </div>
              </div>
              <div className="form_input">
                <label htmlFor="age">Change Age</label>
                <input
                  type="number"
                  name="age"
                  id=""
                  onChange={(e)=>{setAge(e.target.value)}}
                  placeholder="enter your Age"
                  defaultValue={data.age}
                />
              </div>
              <div className="form_input">
                <label htmlFor="bw">Change Body Weight</label>
                <input
                  type="number"
                  name="bw"
                  id=""
                  onChange={(e)=>{setBw(e.target.value)}}
                  placeholder="enter your Weight in kg"
                  defaultValue={data.bw}
                />
              </div>
              <div className="form_input">
                <label htmlFor="height">Change Height</label>
                <input
                  type="number"
                  name="height"
                  id=""
                  onChange={(e)=>{setHeight(e.target.value)}}
                  placeholder="enter your Height in cm"
                  defaultValue={data.height}
                />
              </div>
            </div>
            <div className="pani r" onClick={spin?handelSubmitfake:handelSubmit}>
            {spin?<CircularProgress style={{marginLeft:0,height:"1.5rem",width:"1.5rem"}}/>:<span>Edit</span>}
              <div className="liquid"></div>
            </div>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Edit;
