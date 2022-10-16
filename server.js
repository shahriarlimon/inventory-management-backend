const express = require('express')
const { ConnectDb } = require('./Db/db')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello shahriar limon!')
})

/* db */
ConnectDb()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})