export default function CalendarDate(props) {
    const {
        calendar: {dates, month, year},
        fn,
        highlightedDate,
    } = props;

    const getDateButton = (date) => {
        const {dateStr, date: d, index: i} = date;
        const addZero = (n) => (parseInt(n) < 10 ? `0${n}` : n);
        const style = () => {
            const isToday =
                new Date().toDateString() === new Date(dateStr).toDateString();
            const isCurrenMonth =
                new Date(year, month).getMonth() ===
                new Date(dateStr).getMonth();

            const isHighlighted = parseInt(d) === parseInt(highlightedDate);

            const defStyle = 'hover:bg-slate-300 rounded-full';
            const sunday = 'text-red-400';
            const sundayInactive = 'text-red-200';
            const colorInactive = 'text-slate-400';
            const bgToday = 'bg-orange-400';
            const colorToday = 'text-white drop-shadow-xl shadow-black';
            const bgHighlight = 'bg-slate-500';

            let bgColor = '';
            let color = '';
            if (isCurrenMonth) {
                if (!i) color = sunday;

                if (isHighlighted) bgColor = bgHighlight;
                if (isToday) {
                    color = colorToday;
                    bgColor = bgToday;
                }
            } else {
                if (!i) color = sundayInactive;
                else color = colorInactive;
            }
            return `${defStyle} ${color} ${bgColor}`;
        };

        return (
            <button
                onClick={() => fn({type: 'highlightDate', data: dateStr})}
                type='button'
                className={style()}
                key={dateStr}
            >
                {addZero(d)}
            </button>
        );
    };

    return <>{dates.map((date) => getDateButton(date))}</>;
}
