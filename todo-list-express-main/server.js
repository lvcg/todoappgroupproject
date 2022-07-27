//declare variables
// declare variables express to make communication with the server, 
const app = express()
//mongoclient as a database
const MongoClient = require('mongodb').MongoClient
//Port to make the server listen on a port
const PORT = 2121
//dotenv to make the server use environment variables
require('dotenv').config()

//connect database
// declare variable - connect to the Mongodb, create a new db if it doesn't exist , string should be stored in .env file
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'
// connect to the database 
//connecting to  db //
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
// wait for the response  //
  .then(client => {
//check console log     //
    console.log(`Connected to ${dbName} Database`)
// check console for dbname  //
      db = client.db(dbName)
    })
 
//setup middleware
// ejs file - render view of app //
app.set('view engine', 'ejs')
// static folder to view app, static and stylesheet //
app.use(express.static('public'))
// body parser to parse the body of the request //
app.use(express.urlencoded({ extended: true }))
// connect to the database, converts to json data //
app.use(express.json())

// app methods
// get request and response to the server, root directory endpoint //
app.get('/',async (request, response)=>{
// wait for  response mongodb, create array to store the data //
    const todoItems = await db.collection('todos').find().toArray()
    // search collection count the number of items in the collection, completed and incomplete //
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    // render the list in the ejs file, to do completed and incomplete//
    response.render('index.ejs', { items: todoItems, left: itemsLeft })
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})

// app post methods
// create todo item insert into db , endpoint addTodo//
app.post('/addTodo', (request, response) => {
  // arrow function to insert the data into the database //  
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})
    // thing is id/label of the todo item, completed is false by default//
    .then(result => {
    // result added to console log //
        console.log('Todo Added')
    // redirect to the root directory, reload,refresh //
        response.redirect('/')
    })
    // catch error //
    .catch(error => console.error(error))
})

// app update methods
// update todo item, endpoint makeComplete as response object//
app.put('/markComplete', (request, response) => {
    //request goes to the to do db,goes to the matching thing value property thats called from the request, sets completed value to true//
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
       // set the completed value to true // 
        $set: {
            completed: true
          }
    },
    //sort by id value in db, update  the data into the database //
    {
        sort: {_id: -1},
        upsert: false
    })
    // console log and response in json format, server  //
    .then(result => {
        console.log('Marked Complete')
        // client response in json format //
        response.json('Marked Complete')
    })
    // catch error //
    .catch(error => console.error(error))

})

// app put method //
// update incomplete todo item, endpoint makeUncomplete as response object//
app.put('/markUnComplete', (request, response) => {
    // request goes to the to do db, goes to the matching thing value property thats called from the request, sets completed value to false//
    db.collection('todos').updateOne({thing: request.body.itemFromJS},
        // set the completed value to false //
        {
        $set: {
            completed: false
          }
    },
    // sort by id value in db, update the data into the database //{
        sort: {_id: -1},
        upsert: false
    })
    // console log and response in json format, server  //
    .then(result => {
        console.log('Marked Complete')
        // client response in json format //
        response.json('Marked Complete')
    })
    // catch error //
    .catch(error => console.error(error))



// app delete methods
// delete todo item, endpoint deleteItem  as response object//
app.delete('/deleteItem', (request, response) =>
 
    // request goes to the to do db, goes to the matching thing value property thats called from the request, deletes the item//
    {
    db.collection('todos').deleteOne({thing: request.body.itemFromJS})
    // console log and response in json format, server  //
    .then(result => {
        console.log('Todo Deleted')
        // client response in json format //
        response.json('Todo Deleted')
    })
    // catch error //
    .catch(error => console.error(error))

})

// start server 
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})


// project  group - Brad Cederberg 
//Twisted7ech #1600
//Kevin Miller -boongonzalez#0754
//Bryce Archibald          Discord:bryceka#5349     
//Rob Perry
//r_c_#6715
//Tim Schiemann

//Pred #3266 
//