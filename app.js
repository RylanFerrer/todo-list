// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

  const workItems = []; // this array is to push tasks done on the work list
  const items = []; // this array is to push tasks done on the normal webpage
  app.get("/",function(req,res){
  let day = date.getDate(); // let the exported function from date.js getDate() equal to the variable day

res.render("list", { // this renders the variables into the list.ejs template
  listTitle: day,
  newListItem: items
});

app.post("/", function(req,res){ // this posts things to the root

  let item = req.body.newItem; // the item variable is equal to the tasks the user inputs into the search bar

  if (req.body.list === "Work") { // if the lists is in the /work root then push it to the workItems array and redirect it to /work root
    workItems.push(item);
    res.redirect("/work");
  }
  else
  {
    items.push(item); // if it does not push it to the main page's list
    res.redirect("/");
  }

});

});

app.get("/work", function(req,res){ //get the work root
    res.render("list",
     {
      listTitle: "Work List", // The list title will equal to the string "Work List"
      newListItem: workItems
     });
});

app.post("/work", function(req,res){
  let item = req.body.newItem;
  workItem.push(item);
  res.redirect("/work");
});

app.listen(process.env.PORT || 3000,function(){ // connect the server to port 3000
  console.log("Server started on port 3000");
});
