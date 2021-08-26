import React, { useState, useEffect } from "react";
import Student from "./Component/student";
import { getStudents } from "./Network/API";
import { studentJSON } from "./interface";
import "./Styles/App.css";

const App = () => {
  const [data, setData] = useState<Array<studentJSON>>([]);
  const [filteredData, setFilteredData] = useState<Array<studentJSON>>(data);
  const [nameFilterData, setNameFilterData] = useState<Array<studentJSON>>([]);
  const [tagFilterData, setTagFilterData] = useState<Array<studentJSON>>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getStudents();
      let tagData: studentJSON[] = [];
      res.students.map((student: studentJSON) => {
        let addTagToStudent = student;
        addTagToStudent.tags = [];
        tagData.push(addTagToStudent);
      });

      setData(tagData);
      setFilteredData(tagData);
    }

    fetchData();
  }, []);

  const nameFilterStudents = (nameFilter: string) => {
    console.log("Tag Filter: " + JSON.stringify(tagFilterData));
    console.log(tagFilterData.length);
    if (tagFilterData.length === 0) {
      console.log("here1");
      let filter: string = nameFilter.toLowerCase();
      let nameFilterResult: studentJSON[] = [];
      nameFilterResult = data.filter((studentRecord: studentJSON) => {
        return (
          studentRecord.firstName.toLowerCase().search(filter) !== -1 ||
          studentRecord.lastName.toLowerCase().search(filter) !== -1
        );
      });

      setFilteredData(nameFilterResult);
      setNameFilterData(nameFilterResult);
    } else {
      console.log("here2");
      // we have a tag in place so now we must serach for a name in that data
      let filter: string = nameFilter.toLowerCase();
      let nameFilterResult: studentJSON[] = [];
      nameFilterResult = data.filter((studentRecord: studentJSON) => {
        return (
          studentRecord.firstName.toLowerCase().search(filter) !== -1 ||
          studentRecord.lastName.toLowerCase().search(filter) !== -1
        );
      });

      let tagNameFilterResult: studentJSON[] = [];
      tagNameFilterResult = tagFilterData.filter(
        (studentRecord: studentJSON) => {
          return (
            studentRecord.firstName.toLowerCase().search(filter) !== -1 ||
            studentRecord.lastName.toLowerCase().search(filter) !== -1
          );
        }
      );

      setNameFilterData(nameFilterResult);
      setFilteredData(tagNameFilterResult);
    }
  };

  const tagFilterStudents = (tagFilter: string) => {
    console.log(nameFilterData);
    console.log(nameFilterData.length);
    if (nameFilterData.length === 0) {
      console.log("here3");
      let tagFilterResult: studentJSON[] = [];
      tagFilterResult = data.filter((student: studentJSON) => {
        /*
          cannot use serach function like we did in namefilter due to '.' 
          being a special character that needs to be inputted with escape characters
          if not then other students with tags will also pass the filter as
          .search(filter) with tagFilter = '.' will always return 0 and not -1
        */
        return student.tags.join().includes(tagFilter) === true;
      });

      setTagFilterData(tagFilterResult);
      setFilteredData(tagFilterResult);
    } else {
      console.log("here4");
      console.log(nameFilterData);

      let tagFilterResult: studentJSON[] = [];
      tagFilterResult = data.filter((student: studentJSON) => {
        /*
          cannot use serach function like we did in namefilter due to '.' 
          being a special character that needs to be inputted with escape characters
          if not then other students with tags will also pass the filter as
          .search(filter) with tagFilter = '.' will always return 0 and not -1
        */
        return student.tags.join().includes(tagFilter) === true;
      });

      let tagNameFilterResult: studentJSON[] = [];
      tagNameFilterResult = nameFilterData.filter((student: studentJSON) => {
        return student.tags.join().includes(tagFilter) === true;
      });

      setTagFilterData(tagFilterResult);
      setFilteredData(tagNameFilterResult);
    }
  };

  const addStudentTag = (tag: string, index: number) => {
    const studentsTag = [...data];
    studentsTag[index].tags.push(tag);
    setData(studentsTag);
  };

  return (
    <div className="app-content">
      <form className="input-fields">
        <input
          className="name-filter"
          type="text"
          placeholder="Search by name"
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            nameFilterStudents(event.target.value);
          }}
        />
        <input
          className="tag filter"
          type="text"
          placeholder="Search by tag"
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            tagFilterStudents(event.target.value);
          }}
        />
      </form>
      <section className="student-records">
        {filteredData.length !== 0 ? (
          filteredData.map((student: studentJSON) => (
            <Student
              student={student}
              key={student.id}
              addTag={addStudentTag}
            />
          ))
        ) : (
          <p className="no-records"> no results </p>
        )}
      </section>
    </div>
  );
};

export default App;
