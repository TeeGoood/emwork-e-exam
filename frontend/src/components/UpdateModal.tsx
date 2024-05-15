import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Expense } from "../types";
import { FetchFunctionContext } from "../App";
import axios from "axios";
import ReactDatePicker from "react-datepicker";

const UpdateModal = ({
  propData,
  isOpen,
  setisOpen,
}: {
  propData: Expense;
  isOpen: boolean;
  setisOpen: (prev: boolean) => void;
}) => {
  const [data, setdata] = useState<Expense>({
    _id: propData._id,
    type: propData.type,
    name: propData.name,
    amount: propData.amount,
    date: propData.date,
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
    console.log(data._id);
    axios
      .put("http://localhost:3000/expense/" + data._id, reqData)
      .then(fetchData);
    setisOpen(false);
  };

  return (
    <section
      className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 flex items-center justify-center"
      onClick={() => setisOpen(false)}
    >
      <form
        className="flex flex-col items-start gap-4 bg-white p-6"
        onSubmit={(e) => handleOnSubmit(e)}
        onClick={(e) => e.stopPropagation()}
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
          <ReactDatePicker
            selected={data.date}
            onChange={(inputDate) => {
              inputDate && setdata({ ...data, date: inputDate });
            }}
            className="border"
          />
        </label>
        <button className="bg-green-500 px-4 py-2 text-white font-bold hover:opacity-50 transition rounded-xl">
          เเก้ไขข้อมูล
        </button>
      </form>
    </section>
  );
};

export default UpdateModal;
