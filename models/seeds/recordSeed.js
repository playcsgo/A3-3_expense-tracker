require('dotenv').config()
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const SEED_USER = [
  {
  name: 'user1',
  email: 'user1@example.com',
  password: 'seed',  
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: 'seed'
  }
]

const SEED_EXPENSE1 = [
  {
  name: '管理費1',
  date: '2023/04/05',
  amount: 1980,
  categoryId: 1,
  },
  {
    name: '紅燈右轉1',
    date: '2023/04/06',
    amount: 1200,
    categoryId: 2,
  },
  {
    name: '打球1',
    date: '2023/04/07',
    amount: 3600,
    categoryId: 3,
  },
  {
    name: '池上便當1',
    date: '2023/04/08',
    amount: 120,
    categoryId: 4,
  },
  {
    name: '888',
    date: '2023/04/05',
    amount: 3600,
    categoryId: 5,
    },
]

const SEED_EXPENSE2 = [
  {
  name: '管理費2',
  date: '2023/04/05',
  amount: 1980,
  categoryId: 1,
  },
  {
    name: '紅燈右轉2',
    date: '2023/04/06',
    amount: 1200,
    categoryId: 2,
  },
  {
    name: '打球2',
    date: '2023/04/07',
    amount: 3600,
    categoryId: 3,
  },
  {
    name: '池上便當2',
    date: '2023/04/08',
    amount: 120,
    categoryId: 4,
  },
  {
    name: '168',
    date: '2023/04/05',
    amount: 3600,
    categoryId: 5,
    },
]

db.once('open',async () => {
  await Promise.all(SEED_USER.map(user => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
      .then(user => {
        if (user.name === "user1") {
          SEED_EXPENSE1.forEach(expense => {
            expense.userId = user._id
            Record.create(expense)
          })
        } else if (user.name === "user2") {
          SEED_EXPENSE2.forEach(expense => {
            expense.userId = user._id
            Record.create(expense)
          })
        }
      })
  }))
  console.log('done')
  //不會 async
})
