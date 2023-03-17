import "./App.css";
import Login from "./MyComponents/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import Choose from "./MyComponents/Choose";
import Register from "./MyComponents/Register";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

const user=(userid)=>{

  localStorage.setItem("username",userid)


}

const memo=(selected_memo)=>{

  localStorage.setItem("selected_memo",selected_memo)
  console.log(localStorage)


}

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login user={user} />}></Route>

          <Route exact path="/choose" element={<Choose selected_memo={memo}  />}></Route>

          <Route exact path="/register" element={<Register/>}></Route>

        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
