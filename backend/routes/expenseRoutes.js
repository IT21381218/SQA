const express = require("express")
const { protect } = require("../middleware/authMiddleware")
const upload = require("../middleware/multer")
const {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseStats,
  generatePDF,
} = require("../controllers/expenseController")

const router = express.Router()

// All routes are protected
router.use(protect)

// Create expense with optional receipt upload
router.post("/", upload.single("receipt"), createExpense)

// Get all expenses with filtering
router.get("/", getExpenses)

// Get expense statistics
router.get("/stats", getExpenseStats)

// Generate PDF report
router.get("/pdf", generatePDF)

// Get, update, delete specific expense
router.route("/:id").get(getExpenseById).put(upload.single("receipt"), updateExpense).delete(deleteExpense)

module.exports = router
