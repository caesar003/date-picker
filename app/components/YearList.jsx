import {HiChevronUp, HiChevronDown} from 'react-icons/hi';
import {useState, useEffect} from 'react';
export default function YearList(props) {
    console.log(props);
    const {months, curYear, fn, Ref} = props;
    const getYears = () => {
        const years = [];
        for (let i = 1901; i <= 2200; i++) {
            years.push(i);
        }
        return years;
    };

    const [selectedYear, selectYear] = useState(curYear);

    const handleYearSelect = (year) => {
        if (selectedYear !== year) selectYear(year);
        else selectYear(0);
    };

    const years = getYears();

    useEffect(() => {
        const yearListContainer = document.getElementById('yearListContainer');
        const yearIndex = years.indexOf(selectedYear);
        const yearHeight = 25.041322314049587;
        if (selectedYear)
            yearListContainer.scroll({
                top: yearHeight * yearIndex,
                behavior: 'smooth',
            });
    }, [selectedYear]);
    return (
        <div
            ref={Ref}
            id='yearListContainer'
            className='z-10 p-2 bg-white rounded-lg border border-gray-200 shadow-md absolute left-0 top-[50px] w-full h-64 overflow-y-auto'
        >
            {years.map((year) => (
                <div key={year}>
                    <button
                        onClick={() => handleYearSelect(year)}
                        className='w-full flex justify-between border-b-[1px] border-blue-400 '
                    >
                        <div>{year}</div>
                        {selectedYear === year ? (
                            <HiChevronUp />
                        ) : (
                            <HiChevronDown />
                        )}
                    </button>
                    <div className='grid grid-cols-3 gap-2'>
                        {selectedYear === year &&
                            months.map((month, i) => (
                                <button
                                    key={month}
                                    onClick={() =>
                                        fn({
                                            type: 'setCalendar',
                                            data: {year, month: i},
                                        })
                                    }
                                >
                                    {month}
                                </button>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
