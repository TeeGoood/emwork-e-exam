import dayjs from "dayjs";
import ReactDatePicker from "react-datepicker";

interface DateShowProps {
  dateQuery: Date;
  setdateQuery: (date: Date) => void;
}

const DateShow = (props: DateShowProps) => {
  const { dateQuery, setdateQuery } = props;

  return (
    <section className="text-right mt-4">
      <ReactDatePicker
        value={dayjs(dateQuery).format("MM/YYYY")}
        onChange={(inputDate) => inputDate && setdateQuery(inputDate)}
        className="border p-2"
      />
    </section>
  );
};

export default DateShow;
