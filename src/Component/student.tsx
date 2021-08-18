import React from "react";
import { studentInfo } from "../interface";

const Student = (props: { info: studentInfo }) => {
  const calculateMean = (): string => {
    let totalGrade: number = 0;
    for (let i = 0; i < props.info.grades.length; i++) {
      totalGrade += parseInt(props.info.grades[i]);
    }

    let averageGrade: number = totalGrade / props.info.grades.length;
    return averageGrade.toString();
  };

  return (
    <div className="student-info">
      <img
        src={props.info.pic}
        alt={props.info.email}
        className="student-img"
      />
      <div className="right">
        <p className="student-name">
          {props.info.firstName + " " + props.info.lastName}
        </p>
        <p className="student-email">{`Email: ` + props.info.email}</p>
        <p className="student-skill">{`Skills: ` + props.info.skill}</p>
        <p className="student-grade">{`Average: ` + calculateMean()}</p>
      </div>
    </div>
  );
};

export default Student;
