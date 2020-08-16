const {calculateIntakeEndDate} = require('./index');

describe('calculateIntakeEndDate testing', () => {
    const intakes = [
        {time: "9:15", pills: 1},
        {time: "15:35", pills: 2},
        {time: "22:00", pills: 1},
     ];
    const stock = 6;
    const weekDays = {
       monday: true,
       tuesday: false,
       wednesday: true,
       thursday: false,
       friday: true,
       saturday: false,
       sunday: false,
    };
    test('check if calculateIntakeEndDate defined', () => {
        expect(calculateIntakeEndDate).toBeDefined();
    })
    test('should return "Wrong Frequency" string if user enter wrong frequency name', () => {
        expect(calculateIntakeEndDate(intakes, stock, 'eachOthery', weekDays)).toBe('Wrong Frequency')
    })
    test('should return "You should enter week days" string if user doesent enter week days', () => {
        expect(calculateIntakeEndDate(intakes, stock, 'weekly', null)).toBe("You should enter week days")
    })

})