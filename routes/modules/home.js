const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/sort', (req, res) => {
  const userId = req.user._id
  const selectedCategoryId = Number(req.query.sort)
  if (selectedCategoryId === 6) {
    return res.redirect('/')
  }
  Record.find({ userId, categoryId: selectedCategoryId })
    .lean()
    .then(expenses => {
      let totalAmount = 0
      expenses.forEach(expense => {
        totalAmount += expense.amount
        expense.date = expense.date.toISOString().split('T')[0].replace(/-/g, '/')
      })
      console.log(selectedCategoryId)
      res.render('index',{ expenses, totalAmount, selectedCategoryId })
    })
    .catch(err => console.log(err))
})

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .then(expenses => {
      let totalAmount = 0
      expenses.forEach(expense => {
        totalAmount += expense.amount
        expense.date = expense.date.toISOString().split('T')[0].replace(/-/g, '/')
      })
      res.render('index',{ expenses, totalAmount })
    })
    .catch(err => console.log(err))
})

module.exports = router