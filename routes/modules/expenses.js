const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const  { body, validationResult } = require('express-validator')

let errorCount = 0
let isBlocked = false

// Create - 1
router.get('/new', (req, res) => {
  if (isBlocked) {
    return res.status(429).send('server down')
  }
  res.render('new')
})

// Create - 2
router.post('/create', [
  body('amount').isNumeric().withMessage('numbers only'),
  body('name').isLength({min:0, max: 20}).withMessage('input too long'),
  body('date').isDate().withMessage('unacceptable date format')
],(req, res) => {
  const bodyError = validationResult(req)
  if (bodyError.errors.length) {
    console.log(bodyError.errors)
    errorCount ++
    console.log('1', errorCount)
    if (errorCount >= 3) {
      isBlocked = true
      console.log('2', isBlocked);
      if (isBlocked) {
        setTimeout(function reset() {
          isBlocked = false
          console.log('3', 'resetted')
        }, 10000)
        return res.status(429).send('server down')
      }
    }
    return res.redirect('new')
  }
  
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
      // const category = {
      //   rent: false,
      //   cars: false,
      //   fun: false,
      //   food: false,
      //   other: false
      // }
      // switch (expense.categoryId) {
      //   case 1:
      //     category.rent = true;
      //     break
      //   case 2:
      //     category.cars = true;
      //     break  
      //   case 3:
      //     category.fun = true;
      //     break
      //   case 4:
      //     category.food = true;
      //     break
      //   case 5:
      //     category.other = true;
      //     break  
      // }
      res.render('edit', { expense })
    })
})

// Update-2
router.put('/:id', [
  body('amount').isNumeric().withMessage('numbers only'),
  body('name').isLength({min:0, max: 20}).withMessage('input too long'),
  body('date').isDate().withMessage('unacceptable date format')
], (req, res) => {
  const bodyError = validationResult(req)
  if (bodyError.errors.length) {
    console.log(bodyError.errors)
    errorCount ++
    console.log('1', errorCount)
    if (errorCount >= 3) {
      isBlocked = true
      console.log('2', isBlocked);
      if (isBlocked) {
        setTimeout(function reset() {
          isBlocked = false
          console.log('3', 'resetted')
        }, 10000)
        return res.status(429).send('server down')
      }
    }
    return res.redirect('new')
  }

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