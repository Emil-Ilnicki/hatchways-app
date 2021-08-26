import React, { useState } from "react";
import { propData } from "../interface";
import "../Styles/Student.css";

const Student = ({ ...props }: propData) => {
  const [buttonText, setButtonText] = useState<Boolean>(true);
  const [tag, setTag] = useState<string>("");

  const calculateMean = (): string => {
    let totalGrade: number = 0;
    for (let i = 0; i < props.student.grades.length; i++) {
      totalGrade += parseInt(props.student.grades[i]);
    }

    let averageGrade: number = totalGrade / props.student.grades.length;
    return averageGrade.toString();
  };

  return (
    <div className="student-container">
      <div className="student-img-container">
        <img
          className="student-img"
          src={props.student.pic}
          alt={props.student.email}
        />
      </div>
      <section className="center">
        <h1 className="student-name">
          {props.student.firstName.toUpperCase() +
            " " +
            props.student.lastName.toUpperCase()}
        </h1>
        <section className="student-info">
          <p className="student-email">{`Email: ` + props.student.email}</p>
          <p className="student-company">
            {`Company: ` + props.student.company}
          </p>
          <p className="student-skill">{`Skills: ` + props.student.skill}</p>
          <p className="student-average">{`Average: ` + calculateMean()}</p>
          {buttonText ? null : (
            <div className="student-grades">
              {props.student.grades.map((grades, key: number) => (
                <p>
                  {"Test " + key + ":"} &emsp; {grades + "%"}
                </p>
              ))}
            </div>
          )}
          {/* make this its own component */}
          {props.student.tags.map((tag) => (
            <p key={tag}>{tag}</p>
          ))}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const index = parseInt(props.student.id);
              props.addTag(tag, index - 1);
              setTag("");
            }}
          >
            <input
              className="student-tag-input"
              placeholder="Add a tag"
              type="text"
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
              }}
            />
          </form>
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
