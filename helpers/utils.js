const moment = require('moment')
module.exports = {

  getAgeFromBirthday: (birthday) => {
    let today = moment();
    let bday = moment(birthday, 'MM-YYYY');
    let duration = moment.duration(today.diff(bday));
    let years = duration.years();
    let months = duration.months();
    let weeks = duration.weeks();
    let age

    if (years == 0 && months == 0) {
      age = weeks > 1 ? `${weeks} weeks old` : `1 week old`
    } else if (years == 0) {
      age = months > 1 ? `${months} months old` : `1 month old`
    } else if (months == 0) {
      age = years > 1 ? `${years} years old` : `1 year old`
    } else {
      age = `${years} ${years > 1 ? `years` : `year`} ${months} ${months > 1 ? `months` : `month`} old`
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