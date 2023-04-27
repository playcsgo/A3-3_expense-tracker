const express = require('express')
const router = express.Router()
const Record = require('../../models/record')


router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .then(expenses => {
      let totalAmount = 0
      expenses.forEach(expense => {
        totalAmount += expense.amount
        expense.date = expense.date.toISOString().split('T')[0].replace(/-/g, '/')
        switch (expense.categoryId) {
          case 1:
            expense.rent = true;
            break
          case 2:
            expense.cars = true;
            break  
          case 3:
            expense.fun = true;
            break
          case 4:
            expense.food = true;
            break
          case 5:
            expense.other = true;
            break  
        }
      })
      res.render('index',{ expenses, totalAmount })
    })
    .catch(err => console.log(err))
})

module.exports = router