import React, { useEffect, useRef, useState } from "react";
import { Download } from "react-feather";
import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";
import "./Body.css";
import ReactToPrint from "react-to-print";

function Body() {
  const colors = ["#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936"];
  const sections = {
    basicInfo: "Basic Info",
    education: "Education",
    project: "Project",
    workExp: "Experience",
    // achievement: "Achievements",
    skill: "Skill",
    // overview: "Overview",
    hobbies: "Hobbies",
    // summary: "Summary",
    // other: "Other",
  };
  const [activeColor, setActiveColor] = useState(0);
  const resumeRef = useRef();
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.skill]: {
      id: sections.skill,
      sectionTitle: sections.skill,
      points: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.hobbies]: {
      id: sections.hobbies,
      sectionTitle: sections.hobbies,
      points: [],
    },
    // [sections.achievement]: {
    //   id: sections.achievement,
    //   sectionTitle: sections.achievement,
    //   points: [],
    // },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",
    },
    [sections.other]: {
      id: sections.other,
      sectionTitle: sections.other,
      detail: "",
    },
  });

  useEffect(() => {
    console.log(resumeInformation);
  }, [resumeInformation]);

  return (
    <div className="body_container">
      <p className="body_heading">Professional Resume Builder</p>

      <div className="body_toolber">
        <div className="colors">
          {colors.map((item) => (
            <span
              key={item}
              style={{ backgroundColor: item }}
              className={`${"color"} ${activeColor === item ? "activec" : ""}`}
              onClick={() => setActiveColor(item)}
            />
          ))}
        </div>
        <ReactToPrint
          trigger={() => {
            return (
              <button>
                Download
                <Download />
              </button>
            );
          }}
          content={() => resumeRef.current}
        />
        {/* <ComponentToPrint ref={el => (this.componentRef = el)} /> */}
      </div>
      <div className="main">
        <Editor
          sections={sections}
          information={resumeInformation}
          setInformation={setResumeInformation}
        />
        <Resume
          ref={resumeRef}
          sections={sections}
          information={resumeInformation}
          activeColor={activeColor}
        />
      </div>
    </div>
  );
}

export default Body;
