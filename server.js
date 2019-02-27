const express = require('express');
const app = express();

// install session module first using 'npm install express-session'
var session = require('express-session'); 
app.use(session({ secret: 'happy jungle', 
                  resave: false, 
                  saveUninitialized: false, 
                  cookie: { maxAge: 60000 }}))


app.get('/', songs);                  
app.get('/sort', sort);
app.get('/add', add);
app.get('/remove', remove);
app.get('/clear', clear)
app.listen(process.env.PORT,  process.env.IP, startHandler())

function startHandler()
{
  console.log('Server listening on port ' + process.env.PORT)
}

//Listing out songs
function songs(req, res)
{
  console.log("Handling a request");
  try
  {
    if (req.session.songs == undefined)
    {
      req.session.songs = [];
    }
  }
  catch (e)
  {
    result = {'error' : e.message};
  }
  var result = {'songs': req.session.songs};
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(result));
  res.end('');
}

//Sorting songs
function sort(req, res)
{
  console.log("Handling a request");
  req.session.songs.sort(req.query.song);
  let result = {'songs': req.session.songs};
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(result));
  res.end('');
}

//Adding songs to current array
function add(req, res)
{
  console.log("Handling a request");
  req.session.songs.push(req.query.song)
  let result = {'song': req.session.songs};
  res.writeHead(200, {'Content-Type': 'application/json'})
  res.write(JSON.stringify(result));
  res.end('');
}

//Removing specified songs from current array
function remove(req,res)
{
  console.log("Handling a request");
  let songlist = req.session.songs;
  for ( var i = 0; i < songlist.length; i++)
  {
    if ( songlist[i] == req.query.song)
    {
      songlist.splice(i, 1);
      req.session.songs = songlist;
    }
  }
  let result = {'song': songlist};
  res.writeHead(200, {'Content-Type': 'application/json'})
  res.write(JSON.stringify(result));
  res.end('');
}

//Clearing the array of all song elements
function clear(req, res)
{
  console.log("Handling a request");
  req.session.songs = [];
  let result = {'song': req.session.songs};
  res.writeHead(200, {'Content-Type': 'application/json'})
  res.write(JSON.stringify(result));
  res.end('');
}