require('./app.scss');

function calcCredit(rating) {
  let credit = 0;
  if (rating > 4 && rating <= 4.5) credit = 1;
  else if (rating > 4.5) credit = 2;
  return credit;
}


module.exports = {
  calcCredit
};
