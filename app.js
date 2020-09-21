const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware');


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json()); 
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://nouha:IbIpf3fSpjYcChHQ@freecluster.bqtaj.mongodb.net/lyne?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });

// event listners
mongoose.connection.once('open', function() {
  console.log('Conected to the database');
  var listener = app.listen(5440, function(){
    console.log('Listening on port ' + listener.address().port); 
  });
}).on('error', function(err){
  console.log('Unable to connect to the database ' + err);
});


 
// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth,(req, res) => res.render('smoothies'));
app.use('/auth',authRoutes);