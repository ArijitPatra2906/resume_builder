import React, { useEffect, useState } from "react";
import InputControl from "../InputControl/InputControl";
import "./Editor.css";
import { X } from "react-feather";

function Editor(props) {
  const sections = props.sections;
  const information = props.information;

  const [activeSectionKey, SetActiveSectionKey] = useState(
    Object.keys(sections)[0]
  );

  const [activeInformation, setActiveInformation] = useState(
    information[sections[Object.keys(sections)[0]]]
  );

  const [sectionTitle, setSectionTitle] = useState(
    sections[Object.keys(sections)[0]]
  );

  const [activeDetailIndex, setActiveDetailIndex] = useState(0);

  const [values, setValues] = useState({
    name: activeInformation?.detail?.name || "",
    title: activeInformation?.detail?.title || "",
    dateOfBirth: activeInformation?.detail?.dateOfBirth || "",
    linkedin: activeInformation?.detail?.linkedin || "",
    github: activeInformation?.detail?.github || "",
    email: activeInformation?.detail?.email || "",
    phone: activeInformation?.detail?.phone || "",
    nationality: activeInformation?.detail?.nationality || "",
    address: activeInformation?.detail?.address || "",
  });

  const handlePointUpdate = (value, index) => {
    const tempValues = { ...values };
    if (!Array.isArray(tempValues.points)) tempValues.points = [];
    tempValues.points[index] = value;
    setValues(tempValues);
  };

  const handleSubmission = () => {
    // eslint-disable-next-line default-case
    switch (sections[activeSectionKey]) {
      case sections.basicInfo: {
        const tempDetail = {
          name: values.name,
          title: values.title,
          dateOfBirth: values.dateOfBirth,
          linkedin: values.linkedin,
          github: values.github,
          email: values.email,
          phone: values.phone,
          address: values.address,
          nationality: values.nationality,
        };
        props.setInformation((prev) => ({
          ...prev,
          [sections.basicInfo]: {
            ...prev[sections.basicInfo],
            detail: tempDetail,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.workExp: {
        const tempDetail = {
          certificationLink: values.certificationLink,
          title: values.title,
          startDate: values.startDate,
          endDate: values.endDate,
          companyName: values.companyName,
          location: values.location,
          points: values.points,
        };
        const tempDetails = [...information[sections.workExp]?.details];
        tempDetails[activeDetailIndex] = tempDetail;
        props.setInformation((prev) => ({
          ...prev,
          [sections.workExp]: {
            ...prev[sections.workExp],
            details: tempDetails,
          },
          sectionTitle,
        }));
        break;
      }
      case sections.project: {
        const tempDetail = {
          link: values.link,
          title: values.title,
          overview: values.overview,
          github: values.github,
          points: values.points,
        };
        const tempDetails = [...information[sections.project]?.details];
        tempDetails[activeDetailIndex] = tempDetail;
        props.setInformation((prev) => ({
          ...prev,
          [sections.project]: {
            ...prev[sections.project],
            details: tempDetails,
          },
          sectionTitle,
        }));
        break;
      }
      case sections.education: {
        const tempDetail = {
          title: values.title,
          college: values.college,
          //   startDate: values.startDate,
          endDate: values.endDate,
          percentage: values.percentage,
        };
        const tempDetails = [...information[sections.education]?.details];
        tempDetails[activeDetailIndex] = tempDetail;
        props.setInformation((prev) => ({
          ...prev,
          [sections.education]: {
            ...prev[sections.education],
            details: tempDetails,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.summary: {
        const tempDetail = values.summary;

        props.setInformation((prev) => ({
          ...prev,
          [sections.summary]: { ...prev[sections.summary], detail: tempDetail },
          sectionTitle,
        }));
        break;
      }
      case sections.other: {
        const tempDetail = values.other;
        props.setInformation((prev) => ({
          ...prev,
          [sections.other]: { ...prev[sections.other], detail: tempDetail },
          sectionTitle,
        }));
        break;
      }

      case sections.skill: {
        const tempPoints = values.points;

        props.setInformation((prev) => ({
          ...prev,
          [sections.skill]: {
            ...prev[sections.skill],
            points: tempPoints,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.hobbies: {
        const tempPoints = values.points;

        props.setInformation((prev) => ({
          ...prev,
          [sections.hobbies]: {
            ...prev[sections.hobbies],
            points: tempPoints,
            sectionTitle,
          },
        }));
        break;
      }
    }
  };

  const handleAddNew = () => {
    const details = activeInformation?.details;
    setActiveDetailIndex();
    if (!details) return;
    const lastDetail = details.slice(-1)[0];
    if (!Object.keys(lastDetail).length) return;
    details?.push({});

    props.setInformation((prev) => ({
      ...prev,
      [sections[activeSectionKey]]: {
        ...information[sections[activeSectionKey]],
        details: details,
      },
    }));
    setActiveDetailIndex(details?.length - 1);
  };

  const handleDeleteDetail = (index) => {
    const details = activeInformation?.details
      ? [...activeInformation?.details]
      : "";
    if (!details) return;
    details.splice(index, 1);

    props.setInformation((prev) => ({
      ...prev,
      [sections[activeSectionKey]]: {
        ...information[sections[activeSectionKey]],
        details: details,
      },
    }));
    setActiveDetailIndex((prev) => (prev === index ? 0 : prev - 1));
  };

  const workExpBody = (
    <div className="detail">
      <div className="row">
        <InputControl
          label="Title"
          placeholder="Enter Title eg. Frontend developer"
          value={values.title}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, title: event.target.value }))
          }
        />
        <InputControl
          label="Company Name"
          placeholder="Enter company name eg. flipkart"
          value={values.companyName}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, companyName: event.target.value }))
          }
        />
      </div>
      <div className="row">
        <InputControl
          label="Certificate Link"
          placeholder="Enter certificate link"
          value={values.certificationLink}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              certificationLink: event.target.value,
            }))
          }
        />
        <InputControl
          label="Location"
          placeholder="Enter Location eg. remote"
          value={values.location}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, location: event.target.value }))
          }
        />
      </div>
      <div className="row">
        <InputControl
          label="Start Date"
          type="date"
          placeholder="Enter Start Date"
          value={values.startDate}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, startDate: event.target.value }))
          }
        />
        <InputControl
          label="End Date"
          placeholder="Enter End Date"
          type="date"
          value={values.endDate}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, endDate: event.target.value }))
          }
        />
      </div>
      <div className="column">
        <label>Enter Work description</label>
        <InputControl
          placeholder="Line1"
          value={values.points ? values.points[0] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 0)}
        />
        <InputControl
          placeholder="Line2"
          value={values.points ? values.points[1] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 1)}
        />
        <InputControl
          placeholder="Line3"
          value={values.points ? values.points[2] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 2)}
        />
      </div>
    </div>
  );

  const projectBody = (
    <div className="detail">
      <div className="row">
        <InputControl
          label="Title"
          placeholder="Enter Title eg. chat app"
          value={values.title}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, title: event.target.value }))
          }
        />
      </div>

      <InputControl
        label="Overview"
        placeholder="Enter basic overview of project"
        value={values.overview}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, overview: event.target.value }))
        }
      />
      <div className="row">
        <InputControl
          label="Deployed Link"
          placeholder="Enter Deployed Link of project"
          value={values.link}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, link: event.target.value }))
          }
        />
        <InputControl
          label="Github Link"
          placeholder="Enter Github Link of project"
          value={values.github}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, github: event.target.value }))
          }
        />
      </div>
      <div className="column">
        <label>Enter project description</label>
        <InputControl
          placeholder="Line1"
          value={values.points ? values.points[0] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 0)}
        />
        <InputControl
          placeholder="Line2"
          value={values.points ? values.points[1] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 1)}
        />
        <InputControl
          placeholder="Line3"
          value={values.points ? values.points[2] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 2)}
        />
        <InputControl
          placeholder="Line4"
          value={values.points ? values.points[3] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 3)}
        />
      </div>
    </div>
  );

  const educationBody = (
    <div className="detail">
      <div className="row">
        <InputControl
          label="Title"
          placeholder="Enter title eg. madhyamik"
          value={values.title}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, title: event.target.value }))
          }
        />
      </div>
      <InputControl
        label="College/School Name"
        placeholder="Enter name of your college/school"
        value={values.college}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, college: event.target.value }))
        }
      />
      <div className="row">
        <InputControl
          label="Passing Year"
          placeholder="Enter passsing year"
          value={values.endDate}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, endDate: event.target.value }))
          }
        />

        {/* <InputControl
          label="percentage"
          placeholder="Enter yout percentage"
          value={values.percentage}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, percentage: event.target.value }))
          }
        /> */}
      </div>
    </div>
  );

  const basicInfoBody = (
    <div className="detail">
      <div className="row">
        <InputControl
          label="Name"
          placeholder="Enter your Full Name"
          value={values.name}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Date of birth"
          type="date"
          placeholder="Enter your date of birth"
          value={values.dateOfBirth}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, dateOfBirth: event.target.value }))
          }
        />
      </div>
      <InputControl
        label="Title"
        placeholder="Enter your title"
        value={values.title}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, title: event.target.value }))
        }
      />

      <div className="row">
        <InputControl
          label="Linkedin Link"
          placeholder="Enter your linkedin profile"
          value={values.linkedin}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, linkedin: event.target.value }))
          }
        />
        <InputControl
          label="Github Link"
          placeholder="Enter your github profile"
          value={values.github}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, github: event.target.value }))
          }
        />
      </div>

      <div className="row">
        <InputControl
          label="Email"
          placeholder="Enter your email"
          value={values.email}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Phone No"
          placeholder="Enter your contact number"
          value={values.phone}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, phone: event.target.value }))
          }
        />
      </div>

      <div className="row">
        <InputControl
          label="Nationality"
          placeholder="Enter your nationality e.g Indian"
          value={values.nationality}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, nationality: event.target.value }))
          }
        />
        <InputControl
          label="Address"
          placeholder="Enter your Address"
          value={values.address}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, address: event.target.value }))
          }
        />
      </div>
    </div>
  );

  const hobbiesBody = (
    <div className="detail">
      <div className="column">
        <label>Enter your hobbies</label>
        <InputControl
          placeholder="enter your hobby"
          value={values.points ? values.points[0] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 0)}
        />
        <InputControl
          placeholder="enter your hobby"
          value={values.points ? values.points[1] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 1)}
        />
        <InputControl
          placeholder="enter your hobby"
          value={values.points ? values.points[2] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 2)}
        />
        <InputControl
          placeholder="enter your hobby"
          value={values.points ? values.points[3] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 3)}
        />
        <InputControl
          placeholder="enter your hobby"
          value={values.points ? values.points[4] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 4)}
        />
        <InputControl
          placeholder="enter your hobby"
          value={values.points ? values.points[5] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 5)}
        />
      </div>
    </div>
  );

  const skillsBody = (
    <div className="detail">
      <div className="row">
        <InputControl
          label="Skill 1"
          placeholder="Enter your skill"
          value={values.points ? values.points[0] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 0)}
        />
        <InputControl
          label="Skill 2"
          placeholder="Enter your skill"
          value={values.points ? values.points[1] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 1)}
        />
      </div>

      <div className="row">
        <InputControl
          label="Skill 3"
          placeholder="Enter your skill"
          value={values.points ? values.points[2] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 2)}
        />
        <InputControl
          label="Skill 4"
          placeholder="Enter your skill"
          value={values.points ? values.points[3] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 3)}
        />
      </div>

      <div className="row">
        <InputControl label="Skill 5" placeholder="Enter your skill" />
        <InputControl label="Skill 6" placeholder="Enter your skill" />
      </div>

      <div className="row">
        <InputControl
          label="Skill 7"
          placeholder="Enter your skill"
          value={values.points ? values.points[4] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 4)}
        />
        <InputControl
          label="Skill 8"
          placeholder="Enter your skill"
          value={values.points ? values.points[5] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 5)}
        />
      </div>
    </div>
  );

  //   const achievementsBody = (
  //     <div className="detail">
  //       <div className="column">
  //         <label>List your achievements</label>

  //         <InputControl
  //           placeholder="Line1"
  //           value={values.points ? values.points[0] : ""}
  //           onChange={(event) => handlePointUpdate(event.target.value, 0)}
  //         />
  //         <InputControl
  //           placeholder="Line2"
  //           value={values.points ? values.points[1] : ""}
  //           onChange={(event) => handlePointUpdate(event.target.value, 1)}
  //         />
  //         <InputControl
  //           placeholder="Line3"
  //           value={values.points ? values.points[2] : ""}
  //           onChange={(event) => handlePointUpdate(event.target.value, 2)}
  //         />
  //         <InputControl
  //           placeholder="Line4"
  //           value={values.points ? values.points[3] : ""}
  //           onChange={(event) => handlePointUpdate(event.target.value, 3)}
  //         />
  //       </div>
  //     </div>
  //   );

  const summaryBody = (
    <div className="detail">
      <InputControl
        label="Summary"
        placeholder="Enter your summary"
        value={values.summary}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, summary: event.target.value }))
        }
      />
    </div>
  );

  const otherBody = (
    <div className="detail">
      <InputControl
        label="Other"
        placeholder="Enter something"
        value={values.other}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, other: event.target.value }))
        }
      />
    </div>
  );

  const generateBody = () => {
    switch (sections[activeSectionKey]) {
      case sections.basicInfo:
        return basicInfoBody;
      case sections.workExp:
        return workExpBody;
      case sections.project:
        return projectBody;
      case sections.education:
        return educationBody;
      case sections.skill:
        return skillsBody;
      case sections.hobbies:
        return hobbiesBody;
      //   case sections.achievement:
      //     return achievementsBody;
      case sections.summary:
        return summaryBody;
      case sections.other:
        return otherBody;
      // case sections.basicInfo:return basicInfoBody;
      // case sections.basicInfo:return basicInfoBody;
      default:
        return null;
    }
  };

  useEffect(() => {
    const activeInfo = information[sections[activeSectionKey]];
    setActiveInformation(activeInfo);
    setSectionTitle(sections[activeSectionKey]);
    setActiveDetailIndex(0);
    setValues({
      name: activeInfo?.detail?.name || "",
      overview: activeInfo?.details
        ? activeInfo.details[0]?.overview || ""
        : "",
      link: activeInfo?.details ? activeInfo.details[0]?.link || "" : "",
      certificationLink: activeInfo?.details
        ? activeInfo.details[0]?.certificationLink || ""
        : "",
      companyName: activeInfo?.details
        ? activeInfo.details[0]?.companyName || ""
        : "",
      college: activeInfo?.details ? activeInfo.details[0]?.college || "" : "",
      location: activeInfo?.details
        ? activeInfo.details[0]?.location || ""
        : "",
      startDate: activeInfo?.details
        ? activeInfo.details[0]?.startDate || ""
        : "",
      endDate: activeInfo?.details ? activeInfo.details[0]?.endDate || "" : "",
      points: activeInfo?.details
        ? activeInfo.details[0]?.points
          ? [...activeInfo.details[0]?.points]
          : ""
        : activeInfo?.points
        ? [...activeInfo.points]
        : "",
      title: activeInfo?.details
        ? activeInfo.details[0]?.title || ""
        : activeInfo?.detail?.title || "",
      linkedin: activeInfo?.detail?.linkedin || "",
      // percentage:activeInfo?.details[0]?.percentage || "",
      github: activeInfo?.details
        ? activeInfo.details[0]?.github || ""
        : activeInfo?.detail?.github || "",
      phone: activeInfo?.detail?.phone || "",
      email: activeInfo?.detail?.email || "",
      summary: typeof activeInfo?.detail !== "object" ? activeInfo.detail : "",
      other: typeof activeInfo?.detail !== "object" ? activeInfo.detail : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSectionKey]);

  useEffect(() => {
    setActiveInformation(information[sections[activeSectionKey]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [information]);

  useEffect(() => {
    const details = activeInformation?.details;
    if (!details) return;
    const activeInfo = information[sections[activeSectionKey]];
    setValues({
      overview: activeInfo.details[activeDetailIndex]?.overview || "",
      link: activeInfo.details[activeDetailIndex]?.link || "",
      certificationLink:
        activeInfo.details[activeDetailIndex]?.certificationLink || "",
      companyName: activeInfo.details[activeDetailIndex]?.companyName || "",
      location: activeInfo.details[activeDetailIndex]?.location || "",
      startDate: activeInfo.details[activeDetailIndex]?.startDate || "",
      endDate: activeInfo.details[activeDetailIndex]?.endDate || "",
      points: activeInfo.details[activeDetailIndex]?.points || "",
      title: activeInfo.details[activeDetailIndex]?.title || "",
      linkedin: activeInfo.details[activeDetailIndex]?.linkedin || "",
      github: activeInfo.details[activeDetailIndex]?.github || "",
      college: activeInfo.details[activeDetailIndex]?.college || "",
      percentage: activeInfo.details[activeDetailIndex]?.percentage || "",
      // location: activeInfo.details[activeDetailIndex]?.location || "",
    });
  }, [activeDetailIndex]);
  return (
    <div className="editor_container">
      <div className="editor_heading">
        {Object.keys(sections)?.map((key) => (
          <div
            className={`${"section"} ${
              activeSectionKey === key ? "active" : ""
            }`}
            key={key}
            onClick={() => SetActiveSectionKey(key)}
          >
            {sections[key]}
          </div>
        ))}
      </div>

      <div className="editor_body">
        <InputControl
          label="Title"
          placeholder="Enter section Title"
          value={sectionTitle}
          onChange={(event) => setSectionTitle(event.target.value)}
        />
        <div className="chips">
          {activeInformation?.details
            ? activeInformation?.details?.map((item, index) => (
                <div
                  className={`${"chip"} ${
                    activeDetailIndex === index ? "active" : ""
                  }`}
                  key={item.title + index}
                  onClick={() => setActiveDetailIndex(index)}
                >
                  <p>
                    {sections[activeSectionKey]} {index + 1}
                  </p>
                  <X
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteDetail(index);
                    }}
                  />
                </div>
              ))
            : ""}
          {activeInformation?.details &&
          activeInformation?.details?.length > 0 ? (
            <div className="new" onClick={handleAddNew}>
              +New
            </div>
          ) : (
            ""
          )}
        </div>
        {generateBody()}
        <button className="editor_button" onClick={handleSubmission}>
          Save
        </button>
      </div>
    </div>
  );
}

export default Editor;
