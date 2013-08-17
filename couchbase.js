function (doc) {
  if(doc.loc) {
    var date_time = doc.eventStartDateTime.split(' ');
    var date = date_time[0].split('-');
    var time = date_time[1].split(':');
    emit({type: "Point", coordinates: doc.loc}, date.concat(time));
  }
}