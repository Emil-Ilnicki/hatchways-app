import React, { useState } from "react";
import { studentInfo } from "../interface";
import "../Styles/Student.css";

const Student = (props: { info: studentInfo }) => {
  const [buttonText, setButtonText] = useState<Boolean>(true);

  const calculateMean = (): string => {
    let totalGrade: number = 0;
    for (let i = 0; i < props.info.grades.length; i++) {
      totalGrade += parseInt(props.info.grades[i]);
    }

    let averageGrade: number = totalGrade / props.info.grades.length;
    return averageGrade.toString();
  };

  return (
    <div className="student-container">
      <div className="student-img-container">
        <img
          className="student-img"
          src={props.info.pic}
          alt={props.info.email}
        />
      </div>
      <section className="center">
        <h1 className="student-name">
          {props.info.firstName + " " + props.info.lastName}
        </h1>
        <section className="student-info">
          <p className="student-email">{`Email: ` + props.info.email}</p>
          <p className="student-company">{`Company: ` + props.info.company}</p>
          <p className="student-skill">{`Skills: ` + props.info.skill}</p>
          <p className="student-average">{`Average: ` + calculateMean()}</p>
          {buttonText ? null : (
            <div className="student-grades">
              {props.info.grades.map((grades, key: number) => (
                <p>
                  {"Test " + key + ":"} &emsp; {grades + "%"}
                </p>
              ))}
            </div>
          )}
        </section>
      </section>
      <div className="right">
        <button onClick={() => setButtonText(!buttonText)}>
          {buttonText ? "+" : "-"}
        </button>
      </div>
    </div>
  );
};

export default Student;
