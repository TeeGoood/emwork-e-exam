import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["income", "outcome"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    min: 0,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  lastCreated: {
    type: Date,
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
  },
});

const ExpenseModel = mongoose.model("expense", expenseSchema);

export default ExpenseModel;
