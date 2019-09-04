// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = {
  name: String
};
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todoList!"
});

const item2 = new Item({
  name:"Hit the + button to add a new item."
});

const defaultItems = [item1,item2];




  app.get("/",function(req,res){
      let day = date.getDate(); // let the exported function from date.js getDate() equal to the variable day
    Item.find({}, (err, foundItems) => {
      if(foundItems.length === 0) {
        Item.insertMany(defaultItems, (err) =>{
          if(err){
            console.log(err);
          } else {
            console.log("Successfully saved to default items to DB");
          }
        });
        res.redirect("/");
      } else {
        res.render("list", { // this renders the variables into the list.ejs template
          listTitle: day,
          newListItem: foundItems
        });
      }
    });
});



app.post("/", function(req,res){ // this posts things to the root

  const itemName = req.body.newItem; // the item variable is equal to the tasks the user inputs into the search bar
  const item = new Item({
    name:itemName
  });
  item.save();
  res.redirect("/");

});


app.post("/delete", (req,res) => {
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully Deleted");
    }
  });
  res.redirect("/");
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
