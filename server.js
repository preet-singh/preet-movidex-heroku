require('dotenv').config()
const express = require('express')
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' ? 'common';



const app = express()

//middleware
app.use(morgan(morganSetting));
const SECRET_TOKEN = process.env.API_TOKEN
const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]

//request handler
function handleGetTypes(req, res) {
  res.json(validTypes)
}

//endpoint request
app.get('/types', handleGetTypes)
function handleGetPokemon(req, res) {
  res.send("Hi, Poke!")
}

app.get('/pokemon', handleGetPokemon)
    
app.use((error, req, res, next) => {
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' }}
  } else {
    response = { error }
  }
  res.status(500).json(response)
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  (`Server listening at http://localhost:${PORT}`)
})



//PM Notes:
//can create own middleware for auth key:

function requireAuthHeader(req, res, next){
  const authValue = req.get('Authorization') || ''; //conditional based on having an actual value or empty string for auth values
  if (!authValue.startsWith('Bearer ')){
    return res.status(400).json({error: 'Auth not provided'})
  }
  const token = authValue.split(' ')[1];
  if (token !== SECRET_TOKEN){
    return res.status(401).json({ error: 'invalid credential'})
  }
}
//insert middleware into the pipeline as shown below 
app.get('./types'. requireAuthHeader, handleGetTypes){
  //authentication - use bearer secret token, key = autho, value = bearer
  //can use get method to fetch header out of the headers

}