import { createContext, useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import ShowInfo from "./components/ShowInfo";
import { ExpenseResponse } from "./types";
import axios from "axios";

export const DataContext = createContext<ExpenseResponse>({
  expense: [],
  income: 0,
  outcome: 0,
  total: 0,
});

export const FetchFunctionContext = createContext(() => {});

export const DateQueryContext = createContext({
  dateQuery: new Date(),
  setdateQuery: () => {},
} as {
  dateQuery: Date;
  setdateQuery: (date: Date) => void;
});

function App() {
  const [data, setdata] = useState<ExpenseResponse>({
    expense: [],
    income: 0,
    outcome: 0,
    total: 0,
  });

  const fetchData = () => {
    axios
      .get("http://localhost:3000/expense", {
        params: {
          month: dateQuery.getMonth() + 1,
          year: dateQuery.getFullYear(),
        },
      })
      .then((res) => setdata(res.data));
  };

  const [dateQuery, setdateQuery] = useState(new Date());
  useEffect(() => fetchData(), [dateQuery]);

  return (
    <main>
      <DataContext.Provider value={data}>
        <FetchFunctionContext.Provider value={fetchData}>
          <DateQueryContext.Provider value={{ dateQuery, setdateQuery }}>
            <Form />
            <ShowInfo />
          </DateQueryContext.Provider>
        </FetchFunctionContext.Provider>
      </DataContext.Provider>
    </main>
  );
}

export default App;
