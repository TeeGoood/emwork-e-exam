import { useContext } from "react";
import InfoCard from "./InfoCard";
import { DataContext } from "../App";

const InfoList = () => {
  const data = useContext(DataContext);

  return (
    <div>
      {data.expense.map((e) => (
        <InfoCard data={e} key={e._id} />
      ))}
    </div>
  );
};

export default InfoList;
