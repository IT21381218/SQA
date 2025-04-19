const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    receipt: {
      type: String, // Optional receipt image path
    },
  },
  {
    timestamps: true,
  },
)

// Add indexes for faster querying by date
expenseSchema.index({ user: 1, date: -1 })

module.exports = mongoose.model("Expense", expenseSchema)
