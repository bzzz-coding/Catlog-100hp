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
  },

  checkUrgentInput: (reqBody) => {
    // This is to prevent accidental date input if the user selected urgent, and put in a date, but later changed back to not urgent
    if (reqBody.urgent == 'No') {
      reqBody.needsHomeBy = ''
      return
    } else if (reqBody.urgent == 'Yes' && reqBody.needsHomeBy == '') {
      reqBody.urgent = 'No'
    }
  }

} 