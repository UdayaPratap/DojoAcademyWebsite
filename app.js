const express=require("express");
const path=require("path");
const app=express();
var mongoose=require('mongoose');
const bodyparser=require('body-parser');
mongoose.connect('mongodb://0.0.0.0:27017/contactAcademy', {useNewUrlParser: true});
const port=8000;

//Define mongoose schema
var contactSchema=new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var Contact=mongoose.model('Contact', contactSchema);

//For Express
app.use('/static', express.static('static'));// serve static files
app.use(express.urlencoded());
//For Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));//set views directory
//Endpoints
app.get('/', (req, res)=>{
    const params={};
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res)=>{
    const params={};
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to DB.");
    }).catch(()=>{
        res.status(400).send("Failed to save.");
    });
    // res.status(200).render('contact.pug');
});


//Server listen
app.listen(port, ()=>{
    console.log(`Working on port ${port}`);
})