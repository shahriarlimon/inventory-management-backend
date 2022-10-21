const express = require('express');
const cors = require('cors');
const { ConnectDb } = require('./Db/db')
const app = express()
const port = 5000
const apiRoutes = require("./routes/apiRoutes");
app.use(express.json());
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello shahriar limon!')
})

/* db */
ConnectDb()

app.use("/api/v1", apiRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})