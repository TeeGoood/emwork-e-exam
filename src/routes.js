import express from "express";
import {
  createExpense,
  deleteExpense,
  getExpense,
  getExpenseTotal,
  updateExpense,
} from "./controller.js";

const router = express.Router();

router.get("/expense", getExpense);
router.get("/expense/total", getExpenseTotal);
router.post("/expense", createExpense);
router.put("/expense/:id", updateExpense);
router.delete("/expense/:id", deleteExpense);

export default router;
