// Converting from Date to String
const convertDate = (date: Date) => {
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0');
  var yyyy = date.getFullYear();

  return mm + '/' + dd + '/' + yyyy;
};

export default convertDate;
