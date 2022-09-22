const moment = require('moment')
module.exports = {

  getAgeFromBirthday: (birthday) => {
    let today = moment();
    let bday = moment(birthday, 'MM-YYYY');
    let duration = moment.duration(today.diff(bday));
    let years = duration.years();
    let months = duration.months();
    let age

    if (years == 0) {
      age = `${months} months old`
    } else if (months == 0) {
      age = `${years} years old`
    } else {
      age = `${years} years ${months} months old`
    }
    return age
  }

}