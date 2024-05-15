import axios from "axios";
import { Expense } from "../types";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { FetchFunctionContext } from "../App";
import UpdateModal from "./UpdateModal";

const InfoCard = ({ data }: { data: Expense }) => {
  const fetchData = useContext(FetchFunctionContext);
  const [isOpenModal, setisOpenModal] = useState(false);

  const handleDeleteButtonClick = () => {
    axios.delete("http://localhost:3000/expense/" + data._id).then(fetchData);
  };

  return (
    <div className="grid grid-cols-8 py-4 items-center border divide-x-2">
      <div>{data.type == "income" ? "รายรับ" : "รายจ่าย"}</div>
      <div>{data.name}</div>
      <div>{data.amount}</div>
      <div>{dayjs(data.date).format("DD/MM/YYYY")}</div>
      <div>{dayjs(data.lastCreated).format("DD/MM/YYYY")}</div>
      <div>{dayjs(data.lastUpdated).format("DD/MM/YYYY")}</div>
      <div>
        <button
          className="bg-red-500 text-white px-6 py-1 rounded-xl hover:opacity-50 transition"
          onClick={handleDeleteButtonClick}
        >
          ลบ
        </button>
      </div>
      <div>
        <button
          className="bg-green-400 text-white px-4 py-1 rounded-xl hover:opacity-50 transition"
          onClick={() => setisOpenModal((prev) => !prev)}
        >
          เเก้ไขข้อมูล
        </button>
      </div>

      {isOpenModal && (
        <UpdateModal
          propData={data}
          isOpen={isOpenModal}
          setisOpen={setisOpenModal}
        />
      )}
    </div>
  );
};

export default InfoCard;
