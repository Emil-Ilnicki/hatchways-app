export interface studentJSON {
  city: string;
  company: string;
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  pic: string;
  skill: string;
  grades: [string];
  tags: [string?];
}

export interface propData {
  student: studentJSON;
  key: string;
  addTag: (tag: string, index: number) => void;
}
