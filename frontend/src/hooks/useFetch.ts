import axios from "axios";
import { useEffect, useState } from "react";
import { ExpenseResponse } from "../types";

const useFetch = () => {
  const [data, setdata] = useState<ExpenseResponse>({
    expense: [],
    income: 0,
    outcome: 0,
    total: 0,
  });

  const [dateQuery, setdateQuery] = useState(new Date());

  useEffect(() => {
    axios
      .get("http://localhost:3000/expense", {
        params: {
          month: dateQuery.getMonth() + 1,
          year: dateQuery.getFullYear(),
        },
      })
      .then((res) => setdata(res.data));
  }, [dateQuery]);

  
};

export default useFetch;
