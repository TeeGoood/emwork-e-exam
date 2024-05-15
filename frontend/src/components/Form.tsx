import axios from "axios";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Expense } from "../types";
import { FetchFunctionContext } from "../App";

const Form = () => {
  const [data, setdata] = useState<Expense>({
    _id: "",
    type: "income",
    name: "",
    amount: 0,
    date: new Date(),
  });

  const fetchData = useContext(FetchFunctionContext);

  const handleOnInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    field: string
  ) => {
    setdata({
      ...data,
      [field]: e.target.value,
    });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reqData = { ...data } as any;
    delete reqData["_id"];
    axios.post("http://localhost:3000/expense", reqData).then(fetchData);
  };

  return (
    <form
      className="border p-4 flex items-center justify-between"
      onSubmit={(e) => handleOnSubmit(e)}
    >
      <label>
        <span>ประเภท</span>
        <select
          className="mx-2 px-2 py-2 bg-slate-100"
          value={data.type}
          onChange={(e) => handleOnInputChange(e, "type")}
        >
          <option value="income">รายรับ</option>
          <option value="outcome">รายจ่าย</option>
        </select>
      </label>
      <label>
        <span>ชื่อรายการ</span>
        <input
          type="text"
          className="mx-2 border"
          value={data.name}
          required
          onChange={(e) => handleOnInputChange(e, "name")}
        />
      </label>
      <label>
        <span>จำนวนเงิน</span>
        <input
          type="number"
          className="mx-2 border"
          step=".01"
          required
          value={data.amount}
          onChange={(e) => handleOnInputChange(e, "amount")}
        />
      </label>
      <label className="flex gap-2">
        <span>วันที่</span>
        <DatePicker
          selected={data.date}
          onChange={(inputDate) => {
            inputDate && setdata({ ...data, date: inputDate });
          }}
          className="border"
        />
      </label>
      <button className="bg-blue-600 px-4 py-2 text-white font-bold hover:opacity-50 transition rounded-xl">
        เพิ่มรายการ
      </button>
    </form>
  );
};

export default Form;
