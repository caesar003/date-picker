export const monthMap = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
export const getCalendar = (year, month) => {
    const getLocale = (date, increment) =>
        new Date(year, month + increment, date).toLocaleDateString();
    const getDates = (start, end, index, increment) => {
        const dates = [];
        let idxCounter = index;
        for (let i = start; i <= end; i++) {
            dates.push({
                date: i,
                index: idxCounter,
                dateStr: getLocale(i, increment),
            });
            if (idxCounter === 6) idxCounter = 0;
            else idxCounter++;
        }
        return dates;
    };
    const date = new Date(year, month);
    const monthIndex = date.getDay();
    // returns 0-6, tells us on what day the month starts
    const monthLastIndex = new Date(year, month + 1, 0).getDay();
    // return 0-6, tells us where the next month begins
    const dayCount = new Date(year, month + 1, 0).getDate();
    // returns 28-31, depends on the month
    const prevMonthCount = new Date(year, month, 0).getDate();
    const prevMonthStart = prevMonthCount - (!monthIndex ? 6 : monthIndex - 1);
    const nextMonthEnd = 41 - dayCount - (prevMonthCount - prevMonthStart);
    /**
     * Most people don't like it when the layout changes adjusting the content
     * so we keep the weeks displayed on the calendar fixed into 6
     */
    const prevMonth = getDates(prevMonthStart, prevMonthCount, 0, -1);
    const currMonth = getDates(1, dayCount, monthIndex, 0);
    const nextMonth = getDates(1, nextMonthEnd, monthLastIndex + 1, 1);
    const dates = prevMonth.concat(currMonth, nextMonth);

    return {
        month,
        year,
        monthName: monthMap[month],
        dates,
    };
};
