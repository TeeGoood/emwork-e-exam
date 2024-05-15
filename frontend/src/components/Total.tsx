import { useContext } from "react";
import { DataContext } from "../App";

const Total = () => {
  const data = useContext(DataContext);

  return (
    <section className="mt-4 border p-2 flex gap-4 justify-center">
      <span>
        รายรับ
        <span className="mx-2 bg-slate-100 px-2">{data.income}</span>
      </span>
      <span>
        รายจ่าย
        <span className="mx-2 bg-slate-100 px-2">{data.outcome}</span>
      </span>
      <span>
        คงเหลือ
        <span className="mx-2 bg-slate-100 px-2">{data.total}</span>
      </span>
    </section>
  );
};

export default Total;
