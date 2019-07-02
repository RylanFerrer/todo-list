//jshint esversion:6

//export getDate function
exports.getDate  = function ()
{
  //the variable today is todays date based on the computers clock
  const today = new Date();

  // this is the options for the formatting of the date
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  // turn the today variable into a string with the formatted options and return it
  return today.toLocaleDateString("en-US", options);

};
