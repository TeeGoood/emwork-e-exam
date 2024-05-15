import Total from "./Total";
import Table from "./Table";
import DateShow from "./DateShow";
import { useContext } from "react";
import { DateQueryContext } from "../App";

const ShowInfo = () => {
  const { dateQuery, setdateQuery } = useContext(DateQueryContext);

  return (
    <section>
      <DateShow dateQuery={dateQuery} setdateQuery={setdateQuery} />
      <Total />
      <Table />
    </section>
  );
};

export default ShowInfo;
