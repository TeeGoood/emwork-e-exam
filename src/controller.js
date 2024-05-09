import ExpenseModel from "./expenseModel.js";

export const getExpense = async (req, res) => {
  try {
    let expense = await ExpenseModel.find({});

    if (req.query.month && req.query.year) {
      console.log("debug");
      const month = parseInt(req.query.month);
      const year = parseInt(req.query.year);

      const startDate = new Date(year, month - 1);
      const endDate = new Date(year, month);

      expense = expense.filter((e) => {
        const date = new Date(e.date);
        return date > startDate && date <= endDate;
      });
    }

    res.json(expense);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("cannot get expense");
  }
};

export const getExpenseTotal = async (req, res) => {
  try {
    let expense = await ExpenseModel.find({});

    if (req.query.month && req.query.year) {
      console.log("debug");
      const month = parseInt(req.query.month);
      const year = parseInt(req.query.year);

      const startDate = new Date(year, month - 1);
      const endDate = new Date(year, month);

      expense = expense.filter((e) => {
        const date = new Date(e.date);
        return date > startDate && date <= endDate;
      });
    }

    const income = [];
    const outcome = [];

    let totalIncome = 0;
    let totalOutcome = 0;
    expense.forEach((e) => {
      if (e.type == "income") {
        income.push(e);
        totalIncome += e.amount;
      } else {
        outcome.push(e);
        totalOutcome += e.amount;
      }
    });
    const totalAll = totalIncome - totalOutcome;

    const data = {
      income,
      outcome,
      total: {
        totalIncome,
        totalOutcome,
        totalAll,
      },
    };
    res.json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("cannot get expense");
  }
};

export const createExpense = async (req, res) => {
  const payload = req.body;
  payload.lastCreated = new Date();
  payload.lastUpdated = new Date();

  console.log(payload);

  try {
    const expenseModel = new ExpenseModel(payload);
    const expense = await expenseModel.save();
    res.json(expense);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("cannot create expense");
  }
};

export const updateExpense = async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  payload.lastUpdated = new Date();

  try {
    const expense = await ExpenseModel.findByIdAndUpdate(id, payload);
    res.json({
      message: "update succesful",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("cannot update expense");
  }
};

export const deleteExpense = async (req, res) => {
  try {
    await ExpenseModel.findByIdAndDelete(req.params.id);
    res.json({
      message: "delete succesful",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(`cannot delete expense id ${req.id}`);
  }
};
