let moment = require('moment');
const intakes = [
    {time: "9:15", pills: 1},
    {time: "15:35", pills: 2},
    {time: "18:55", pills: 2},
    {time: "23:40", pills: 1},
 ];
const stock = 40;
const weekDays = {
   monday: true,
   tuesday: false,
   wednesday: true,
   thursday: false,
   friday: true,
   saturday: false,
   sunday: false,
};

function calculateIntakeEndDate(intakes, stock, frequency, weekDays) {
    switch (true) {
        case frequency === 'daily':
           return dailyIntakes(intakes, stock);
            break;
        case frequency === 'weekly':
           return weeklyIntakes(intakes, stock, weekDays);
            break;
        case frequency === 'eachOtherDay':
           return eachOtherDayIntakes(intakes, stock);
            break;
        default:
           return 'Wrong Frequency'
    }

  }
function dailyIntakes (intakes, stock, startDate = moment()) {
        let options = {
            isFirstDay: true,
            currentDate: startDate,
            lastIntake: '',
            countOfPills: stock
        }
      while (options.countOfPills > 0) {
        checkIsFirstDay (options, intakes);
          options.isFirstDay = false;
          iterateIntakes (intakes, options)
          if (options.countOfPills > 0) {
            options.currentDate = moment(options.currentDate).add(1, 'days')
        }
      }
      return returnFinalDate (options)
}

function eachOtherDayIntakes (intakes, stock, startDate = moment()) {
    let options = {
        isFirstDay: true,
        currentDate: startDate,
        lastIntake: this.currentDate,
        countOfPills: stock,
        evenOdd: 1
    }
    while (options.countOfPills > 0) {
        checkIsFirstDay (options, intakes);
        options.isFirstDay = false;
        if (options.evenOdd % 2 === 0) {
            iterateIntakes (intakes, options)
        }
        if (options.countOfPills > 0) {
            options.currentDate = moment(options.currentDate).add(1, 'days');
            options.evenOdd += 1;
        }
    }
   return returnFinalDate (options)
}

function weeklyIntakes (intakes, stock, weekDays, startDate = moment()) {
    let options = {
        isFirstDay: true,
        currentDate: startDate,
        lastIntake: '',
        countOfPills: stock
    }
    if(!weekDays) return 'You should enter week days'
    options.currentDayName = ()=> options.currentDate.format('dddd').toLowerCase();
    while (options.countOfPills > 0) {
        if (options.countOfPills > 0 && weekDays[options.currentDayName()]) {
            checkIsFirstDay (options, intakes);
        }
        options.isFirstDay = false;
        if (options.countOfPills > 0 && weekDays[options.currentDayName()]) {
            iterateIntakes (intakes, options);
        }
        if (options.countOfPills > 0) {
            options.currentDate = moment(options.currentDate).add(1, 'days')
        }
    }
    return returnFinalDate (options);
}

function checkIsFirstDay (options, intakes) {
    if (options.isFirstDay) {
        intakes.forEach((item) => {
            if (moment().unix() < moment(item.time, 'h:mm').unix()) {
                options.countOfPills -= item.pills;
                options.lastIntake = item.time
            }
        })
        if (options.countOfPills > 0) {
            options.currentDate = moment(options.currentDate).add(1, 'days')
        }
    }
}
function iterateIntakes (intakes, options) {
    intakes.forEach((intake) => {
        if (options.countOfPills > 0) {
            options.countOfPills -= intake.pills;
            options.lastIntake = intake.time;
        }
    })
}
function returnFinalDate (options) {
    options.lastIntake = moment(options.lastIntake, 'h:mm');
      return moment(options.currentDate).set({
          hour: options.lastIntake.get('hour'),
          minute: options.lastIntake.get('minute')
      }).format('ddd D.M.YYYY HH:mm')
}


console.log(calculateIntakeEndDate(intakes, stock, 'daily', weekDays))
console.log(calculateIntakeEndDate(intakes, stock, 'weekly', weekDays))
console.log(calculateIntakeEndDate(intakes, stock, 'eachOtherDay', weekDays))
console.log(calculateIntakeEndDate(intakes, stock, 'eachOthery', weekDays));

module.exports = {calculateIntakeEndDate}
