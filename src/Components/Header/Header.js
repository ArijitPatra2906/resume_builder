import React from "react";
import "./Header.css";
import IMG2 from "../../assets/undraw_organize_resume_re_k45b.svg";

const Header = () => {
  return (
    <div>
      <div className="header_container">
        <div className="header_left">
          <p className="header_heading">
            3% of resumes pass the initial application. <span> Be in 3%.</span>
          </p>
          <p className="header_paragraph">
            Create your professional resume in few minutes.
            <span>It's free</span>
          </p>
        </div>
        <div className="header_right">
          <img src={IMG2} alt="resume" />
        </div>
      </div>
    </div>
  );
};

export default Header;
