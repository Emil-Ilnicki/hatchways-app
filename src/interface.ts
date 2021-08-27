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

export interface studentPropData {
  student: studentJSON;
  key: string;
  average: string;
  addTag: (tag: string, index: number) => void;
}

export interface tagPropData {
  tag: string | undefined;
}
