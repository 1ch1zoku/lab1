var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


let data = [
{   id:0,
    name:" ",
    data_start_of_trading:new Date (2020,11,12),
    data_end_of_trading:new Date(2020,11,13),
    starting_price:1000,
    end_price:1500,
    
},
{   id:1,
    name:" ",
    data_start_of_trading:new Date(2020,11,22),
    data_end_of_trading:new Date(2020,11,23),
    starting_price:500,
    end_price:1500,
}
]


app.get('/', function(req, res){
    res.send(data);
})

app.get('/data/:id', function(req, res){
    var result = data.find(function(result){
        return result.id === Number(req.params.id)
    });
    res.send(result);
})

let maxId = data.length;
app.post('/data', function(req, res){
 
        let no = req.body;
        if(Array.isArray(no)){
            for(var i = 0; i < no.length;i++){
                no[i].id = ++maxId;
                data.push(no[i]);
            }
        }
        else{
        no.id = ++maxId;
        data.push(no);}

        res.send(data); 
})

app.put('/data/:id', function(req, res){
    var result = data.find(function(result){
        return result.id === Number(req.params.id)
    });
    result.name = req.body.name;
    result.data_start_of_trading =  Date(req.body.data_start_of_trading),
    result.data_end_of_trading = Date(req.body.data_end_of_trading),
    result.starting_price = Number(req.body.starting_price),
    result.end_price = Number(req.body.end_price),
    res.send(result);
})

app.delete('/data/:id', function(req,res){
    data = data.filter(function(data){
        return data.id !== Number(req.params.id)
    })
    res.send(data);
})

app.get("/data", (req, res) =>{
    let data_end_of_trading = req.query.data_end_of_trading;
    let name = " ";
    let starting_price = 0;
    let end_price = 0;
    let info = data.filter(info=>info.data_end_of_trading === data_end_of_trading);
    if(Array.isArray(info)==true){
        for(var i = 0; i < info.length; i++){
        name+=info[i].name;
    starting_price+=info[i].starting_price;
        end_price+=info[i].end_price;
        }
    }
    else{
        name+=info.name;
        starting_price+=info.starting_price;
        end_price+=info.end_price;
    }
    res.send("name= "+String(name)+", початкова ціна = "+String(starting_price)+", кінцева ціна = "+String(end_price));
    });
    

app.listen(3012, function(){
    console.log('API app started')
})
