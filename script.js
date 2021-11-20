const express = require('express');
const Joi = require('joi'); //used for validation
let path = require('path')
const cors = require('cors');

const app = express();

app.use(express.json());
 
app.use(cors({
    origin: '*'
}));

//Request Handlers
app.get('/', cors(), (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//GET all 
app.get('/api/v1/sayings', cors(), (req,res)=> {
    res.send(sayings);
});

//Get by id
app.get('/api/v1/sayings/:id', cors(), (req, res) => {
    const saying = sayings.find(c => c.id === parseInt(req.params.id));
    
    if (!saying) res.status(404).send('oops... sorry, i cant find what you are looking for');

    res.send(saying);
});
 
//Get by Author
app.get('/api/v1/seneca', cors(),  (req,res)=> {
    const seneca = sayings.filter(c => c.author === "Seneca");
    res.send(seneca);
});

app.get('/api/v1/aurelius', cors(), (req,res)=> {
    const aurelius = sayings.filter(c => c.author === "Marcus Aurelius");
    res.send(aurelius);
});
app.get('/api/v1/epictetus', cors(), (req,res)=> {
    const epictetus = sayings.filter(c => c.author === "Epictetus");
    res.send(epictetus);
});
app.get('/api/v1/zeno', cors(), (req,res)=> {
    const zeno = sayings.filter(c => c.author === "Zeno");
    res.send(zeno);
});

//GET random
app.get('/api/v1/random', cors(),  (req,res)=> {
    const randomSaying = sayings[Math.floor(Math.random() * sayings.length)]
    res.send(randomSaying);
});

//CREATE Request Handler

/*
app.post('/api/sayings', (req, res)=> {
 
const { error } = validatesaying(req.body);
if (error){
res.status(400).send(error.details[0].message)
return;
}
const saying = {
id: sayings.length + 1,
title: req.body.title
};
sayings.push(saying);
res.send(saying);
});
*/

//UPDATE Request Handler

app.put('/api/sayings/:id', (req, res) => {
    const saying = sayings.find(c=> c.id === parseInt(req.params.id));
    if (!saying) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
    
    const { error } = validatesaying(req.body);
    if (error){
    res.status(400).send(error.details[0].message);
    return;
    }
    
    saying.title = req.body.title;
    res.send(saying);
});
 

//DELETE Request Handler

/*
app.delete('/api/sayings/:id', (req, res) => {
 
const saying = sayings.find( c=> c.id === parseInt(req.params.id));
if(!saying) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
 
const index = sayings.indexOf(saying);
sayings.splice(index,1);
 
res.send(saying);
});
 
function validatesaying(saying) {
const schema = {
title: Joi.string().min(3).required()
};
return Joi.validate(saying, schema);
 
}
 */
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));


const sayings = [
    {
        author: 'Marcus Aurelius',
        saying: 'The happiness of your life depends upon the quality of your thoughts.',
        source: 'Meditations',
        id: 1
    },
    {
        author: 'Marcus Aurelius',
        saying: 'Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.',
        source: 'Meditations',
        id: 2
    },
    {
        author: 'Marcus Aurelius',
        saying: 'When you arise in the morning think of what a privilege it is to be alive, to think, to enjoy, to love ...',
        source: 'Meditations',
        id: 3   
    },
    {
        author: 'Seneca',
        saying: 'Difficulties strengthen the mind, as labor does the body.',
        source: 'Letters from a Stoic',
        id: 5
    }
]