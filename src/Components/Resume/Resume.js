import React, { forwardRef, useEffect, useRef, useState } from "react";
import "./Resume.css";
import {
  AtSign,
  Calendar,
  GitHub,
  Linkedin,
  Map,
  MapPin,
  Paperclip,
  Phone,
} from "react-feather";
const Resume = forwardRef((props, ref) => {
  const information = props.information;
  const sections = props.sections;
  const [columns, setColumns] = useState([[], []]);
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const containerRef = useRef();

  const info = {
    workExp: information[sections.workExp],
    education: information[sections.education],
    project: information[sections.project],
    basicInfo: information[sections.basicInfo],
    skill: information[sections.skill],
    hobbies: information[sections.hobbies],
    summary: information[sections.summary],
    other: information[sections.other],
  };

  const getFormattedDate = (value) => {
    if (!value) return "";
    const date = new Date(value);

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const sectionDiv = {
    [sections.workExp]: (
      <div
        key={"workExp"}
        draggable
        onDragOver={() => setTarget(info.workExp?.id)}
        onDragEnd={() => setSource(info.workExp?.id)}
        className={`${"resume_section"}${"resume_workExp"} ${
          info.workExp?.sectionTitle ? "" : "hidden"
        }`}
      >
        <div className="resume_sectionTitle">{info.workExp.sectionTitle}</div>
        <div className="content">
          {info.workExp?.details?.map((item) => (
            <div className="resume_item" key={item.title}>
              {item.title ? (
                <p className="resume_title">{item.title}</p>
              ) : (
                <span />
              )}
              {item.companyName ? (
                <p className="resume_subTitle">{item.companyName}</p>
              ) : (
                <span />
              )}
              {item.certificationLink ? (
                <a
                  href={item.certificationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="resume_link"
                  style={{ marginTop: "-9px" }}
                >
                  <Paperclip />
                  {item.certificationLink}
                </a>
              ) : (
                <span />
              )}
              {item.startDate && item.endDate ? (
                <div className="resume_date">
                  <Calendar /> {getFormattedDate(item.startDate)}-
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                <span />
              )}
              {item.location ? (
                <p className="resume_location">
                  <MapPin />
                  {item.location}
                </p>
              ) : (
                <span />
              )}

              {item.points?.length > 0 ? (
                <ul className="resume_points">
                  {item.points?.map((elem, index) => (
                    <li className="resume_point" key={elem + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.project]: (
      <div
        key={"project"}
        draggable
        onDragOver={() => setTarget(info.project?.id)}
        onDragEnd={() => setSource(info.project?.id)}
        className={`${"resume_section"}${"resume_project"}${
          info.project?.sectionTitle ? "" : "hidden"
        }`}
      >
        <div className="resume_sectionTitle">{info.project.sectionTitle}</div>
        <div className="content">
          {info.project?.details?.map((item) => (
            <div className="resume_item">
              {item.title && <p className="resume_title">{item.title}</p>}

              <a
                href="#/"
                target="_blank"
                rel="noreferrer"
                className="resume_link"
              >
                <Paperclip />
                {item.link}
              </a>

              <a
                href="#/"
                target="_blank"
                rel="noreferrer"
                className="resume_link"
              >
                <GitHub />
                {item.github}
              </a>

              <p className="resume_overview">{item.overview}</p>
              {item.points?.length > 0 ? (
                <ul className="resume_points">
                  {item.points?.map((elem, index) => (
                    <li className="resume_point" key={elem + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.education]: (
      <div
        key={"education"}
        draggable
        onDragOver={() => setTarget(info.education?.id)}
        onDragEnd={() => setSource(info.education?.id)}
        className={`${"resume_section"}${"resume_education"}`}
      >
        <div className="resume_sectionTitle">
          {info.education?.sectionTitle}
        </div>

        <div className="content">
          {info.education?.details?.map((item) => (
            <div className="resume_item">
              {item.title && <p className="resume_title">{item.title}</p>}
              {item.college && (
                <p className="resume_subTitle">{item.college}</p>
              )}

              {item.endDate && (
                <div className="resume_date">
                  <p>Passing Year</p>
                  <Calendar />
                  {item.endDate}
                </div>
              )}
              {/* {item.percentage && (
                <p className="resume_overview">{item.percentage}%</p>
              )} */}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.skill]: (
      <div
        key={"skill"}
        draggable
        onDragOver={() => setTarget(info.skill?.id)}
        onDragEnd={() => setSource(info.skill?.id)}
        className={`${"resume_section"}${"resume_skill"} ${
          info.skill?.sectionTitle ? "" : "hidden"
        }`}
      >
        <div className="resume_sectionTitle">{info.skill?.sectionTitle}</div>

        <div className="content">
          {info.skill?.points?.length > 0 && (
            <ul className="resume_numbered">
              {info.skill?.points?.map((elem, index) => (
                <li className="resume_point" key={elem + index}>
                  {elem}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    ),
    [sections.hobbies]: (
      <div
        key={"hobbies"}
        draggable
        onDragOver={() => setTarget(info.hobbies?.id)}
        onDragEnd={() => setSource(info.hobbies?.id)}
        className={`${"resume_section"}${"resume_hobbies"} ${
          info.hobbies?.sectionTitle ? "" : "hidden"
        }`}
      >
        <div className="resume_sectionTitle">{info.hobbies?.sectionTitle}</div>

        <div className="content">
          {info.hobbies?.points?.length > 0 && (
            <ul className="resume_numbered">
              {info.hobbies?.points?.map((elem, index) => (
                <li className="resume_point" key={elem + index}>
                  {elem}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    ),
    [sections.summary]: (
      <div
        key={"summary"}
        draggable
        onDragOver={() => setTarget(info.summary?.id)}
        onDragEnd={() => setSource(info.summary?.id)}
        className={`${"resume_section"}${"resume_summary"} ${
          info.summery?.sectionTitle ? "" : "hidden"
        }`}
      >
        <div className="resume_sectionTitle">{info.summary?.sectionTitle}</div>

        <div className="content">
          <p className="resume_overview">{info.summary?.overview}</p>
        </div>
      </div>
    ),
    [sections.other]: (
      <div
        key={"other"}
        draggable
        onDragOver={() => setTarget(info.other?.id)}
        onDragEnd={() => setSource(info.other?.id)}
        className={`${"resume_section"}${"resume_other"} ${
          info.other?.sectionTitle ? "" : "hidden"
        }`}
      >
        <div className="resume_sectionTitle">{info.other?.sectionTitle}</div>
        <div className="content">
          <p className="resume_overview">{info.other?.other}</p>
        </div>
      </div>
    ),
  };

  useEffect(() => {
    setColumns([
      [sections.education, sections.project, sections.other, sections.summary],
      [sections.workExp, sections.skill, sections.hobbies],
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const swapSourceTarget = (source, target) => {
    if (!source || !target) return;

    const tempColumns = [[...columns[0]], [...columns[1]]];

    let sourceRowIndex = tempColumns[0].findIndex((item) => item === source);
    let sourceColumnIndex = 0;

    if (sourceRowIndex < 0) {
      sourceColumnIndex = 1;
      sourceRowIndex = tempColumns[1].findIndex((item) => item === source);
    }

    let targetRowIndex = tempColumns[0].findIndex((item) => item === source);
    let targetColumnIndex = 0;

    if (targetRowIndex < 0) {
      targetColumnIndex = 1;
      targetRowIndex = tempColumns[1].findIndex((item) => item === source);
    }

    const tempSource = tempColumns[sourceColumnIndex][sourceRowIndex];
    tempColumns[sourceColumnIndex][sourceRowIndex] =
      tempColumns[targetColumnIndex][targetRowIndex];

    tempColumns[targetColumnIndex][targetRowIndex] = tempSource;

    setColumns(tempColumns);
  };

  useEffect(() => {
    swapSourceTarget(source, target);
  });

  useEffect(() => {
    const resume_container = containerRef.current;
    if (!props.activeColor || !resume_container) return;
    resume_container.style.setProperty("--color", props.activeColor);
  }, [props.activeColor]);
  return (
    <div ref={ref}>
      <div ref={containerRef} className="resume_container">
        <div className="resume_header">
          <p className="resume_heading">{info.basicInfo?.detail?.name}</p>
          <p className="resume_subHeading">{info.basicInfo?.detail?.title}</p>
          <p className="resume_dob">
            {/* <span className="dob">Date of birth :-- </span> */}
            {info.basicInfo?.detail?.dateOfBirth}
          </p>
          <div className="links">
            {info.basicInfo?.detail?.email && (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a className="link" type="email">
                <AtSign /> {info.basicInfo?.detail?.email}
              </a>
            )}
            {info.basicInfo?.detail?.phone && (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a className="link">
                <Phone /> {info.basicInfo?.detail?.phone}
              </a>
            )}
            {info.basicInfo?.detail?.linkedin && (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a className="link">
                <Linkedin /> {info.basicInfo?.detail?.linkedin}
              </a>
            )}
            {info.basicInfo?.detail?.github && (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a className="link">
                <GitHub /> {info.basicInfo?.detail?.github}
              </a>
            )}
            {info.basicInfo?.detail?.nationality && (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a className="link">
                <Map />
                {info.basicInfo?.detail?.nationality}
              </a>
            )}

            {info.basicInfo?.detail?.address && (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a className="link">
                <MapPin /> {info.basicInfo?.detail?.address}
              </a>
            )}
          </div>
        </div>

        <div className="resume_main">
          <div className="col1">
            {columns[0].map((item) => sectionDiv[item])}
          </div>
          <div className="col2">
            {columns[1].map((item) => sectionDiv[item])}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Resume;
