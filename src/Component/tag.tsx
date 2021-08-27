import { tagPropData } from "../interface";
import "../Styles/Tag.css";

const Tag = ({ ...props }: tagPropData) => {
  return (
    <div className="student-tag">
      <p>{props.tag}</p>
    </div>
  );
};

export default Tag;
