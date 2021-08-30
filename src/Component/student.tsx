import React, { useState } from "react";
import { studentPropData } from "../interface";
import "../Styles/Student.css";

import Tag from "./tag";

const Student = ({ ...props }: studentPropData) => {
  const [buttonText, setButtonText] = useState<Boolean>(false);
  const [tag, setTag] = useState<string>("");

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
          <p className="student-average">{`Average: ` + props.average}</p>
          {buttonText && (
            <div className="student-grades">
              {props.student.grades.map((grades: string, key: number) => (
                <p>
                  {"Test " + (key + 1) + ":"} &emsp; {grades + "%"}
                </p>
              ))}
            </div>
          )}
          {props.student.tags.map((text: string | undefined) => (
            <Tag tag={text} />
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
          {buttonText ? "-" : "+"}
        </button>
      </div>
    </div>
  );
};

export default Student;
