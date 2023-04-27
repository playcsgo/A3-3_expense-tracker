const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// Create - 1
router.get('/new', (req, res) => {
  res.render('new')
})

// Create - 2
router.post('/create', (req, res) => {
  req.body.userId = req.user._id
  Record.create(req.body)
    .then(() => {
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

// Update - 1
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(expense => {
      expense.date = expense.date.toISOString().split('T')[0]
      const category = {
        rent: false,
        cars: false,
        fun: false,
        food: false,
        other: false
      }
      switch (expense.categoryId) {
        case 1:
          category.rent = true;
          break
        case 2:
          category.cars = true;
          break  
        case 3:
          category.fun = true;
          break
        case 4:
          category.food = true;
          break
        case 5:
          category.other = true;
          break  
      }
      res.render('edit', { expense, category })
    })
})

// Update-2
router.put('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  req.body.userId = userId
  Record.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.redirect('/')
    })
    .catch(err => console.log(err))
})


// Delete
router.get('/:id/delete', (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  Record.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

module.exports = router