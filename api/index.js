
const keys = require('./keys')



// Express setup
const express       = require('express')
const bodyParser    = require('body-parser')
const cors          = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())



//  Postgress setup
const { Pool }  = require('pg')
const pgClient  = new Pool({
    user:       keys.pgUser
,   host:       keys.pgHost
,   database:   keys.pgDatabase
,   password:   keys.pgPassword
,   port:       keys.pgPort
})

pgClient.on('error', () => console.error('Lost PG Connection'))
pgClient.on('connect', (client) => 
{
    client  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
            .catch((error) => (console.error(error)))
})



// Redis setup
const redis = require('redis')

const redisClient = redis.createClient({
    host:           keys.redisHost
,   port:           keys.redisPort
,   retry_strategy: () => (1000)
})

const redisPublisher = redisClient.duplicate()



// Express handling
app.get('/', (request, response) => 
{
    response.send('Hi!')
})

app.get('/values/all', async (request, response) => 
{
   
    const values = await pgClient.query('SELECT number FROM values')
    response.send(values.rows || [])

})

app.get('/values/current', async (request, response) => 
{
   
    redisClient.hgetall('values', (error, values) =>
    {
        response.send(values || [])
    })

})

app.post('/values', async (request, response) => 
{
   
    const index = parseInt(request.body.index)

    if (index > 40) {
        return (response.status(422).send('Index too high'))
    }

    redisClient.hset        ('values', index, 'Calculating')
    redisPublisher.publish  ('insert', index)

    pgClient.query('INSERT INTO values(number) VALUES($1)', [index])

    response.send({ working: true })

})



// HERE BE DRAGONS !!!
app.listen(5000, (error) => 
{
    console.log('Listening on port 5000')
})
