const express = require('express');
const app = express();

app.use(express.json());

const courses =[
    {id:1,name:'java'},
    {id:2,name:'android'},
    {id:3,name:'flutter'},
]
app.get('/', (req,res)=>{
    res.send('Hello world New ');
});


app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.get('/api/courses/:id', (req,res)=>{
  const course = courses.find(c=>c.id === parseInt(req.params.id))
  if(!course) res.status(404).send('Course not found')
  res.send(course)
});

app.post('/api/courses',(req,res)=>{
    if(!req.body.name || req.body.name.length <3){
        res.status(400).send('Name is required and 3 se ziada')
        return;
    }
    const course = {
        id:courses.length + 1,
        name : req.body.name
    };
    courses.push(course);
    res.send(course);

});

app.put('/api/courses/:id' ,(req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('Course not found')

    if(!req.body.name || req.body.name.length <3){
        res.status(400).send('Name is required and 3 se ziada')
        return;
    }

    course.name = req.body.name ;
    res.send(course);

});

const port = process.env.PORT || 3000 ;

app.listen(port,()=> console.log(`Listening on port ${port}...`))