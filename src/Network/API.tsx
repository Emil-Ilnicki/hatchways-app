const URL = "https://api.hatchways.io/assessment/students";

export const getStudents = async () => {
  const response = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

  return response;
};
