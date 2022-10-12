import {HiArrowSmLeft, HiArrowSmRight, HiCalendar, HiX} from 'react-icons/hi';
import {useReducer, useEffect, useRef} from 'react';
import YearList from './YearList';
import CalendarDate from './CalendarDate';
import {monthMap} from '~/utils';
import {getCalendar} from '~/utils';

const clickOutsideHide = (el, fn, fnPar) => {
    const listener = (event) => {
        if (!el.current || el.current.contains(event.target)) {
            return;
        }
        fn(fnPar);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
    };
};
export default function DatePicker({id, label}) {
    const DATE = new Date();
    const calRef = useRef(null);
    const yearListRef = useRef(null);
    const initialState = {
        calendar: getCalendar(DATE.getFullYear(), DATE.getMonth()),
        currentTime: {
            year: DATE.getFullYear(),
            month: DATE.getMonth(),
        },
        isCalendarShown: false,
        isInputSet: false,
        inputValue: '',
        isYearListShown: false,
        highlightedDate: DATE.getDate(),
    };

    const reducer = (state, action) => {
        const obj = Object.assign({}, state);

        switch (action.type) {
            case 'showCalendar': {
                // Showing the calendar, that's all
                obj.isCalendarShown = true;
                return obj;
            }
            case 'hideCalendar': {
                // Hiding the calendar, obviously
                obj.isCalendarShown = false;
                return obj;
            }
            case 'setCalendar': {
                // Here we change the month and year that calendar displays
                const {data} = action;
                const d = new Date(data.year, data.month);
                obj.calendar = getCalendar(d.getFullYear(), d.getMonth());
                obj.isYearListShown = false;
                return obj;
            }
            case 'highlightDate': {
                /**
                 * This gets triggered as user clicks the date of the calendar
                 * There are several things we do here.
                 * Basically we only want to grab value of the date and set it
                 * into the input field
                 *
                 * Beside that, we also want to move the view if the date clicked
                 * is whether at the beginning of the calendar (previous month) or
                 * near the end of the calendar (means first week of the next month)
                 */

                const toHighlight = new Date(action.data);
                const {
                    calendar: {year: calYear, month: calMonth},
                } = state;
                const isSameMonth =
                    new Date(calYear, calMonth).getMonth() ===
                    new Date(toHighlight).getMonth();
                if (!isSameMonth)
                    obj.calendar = getCalendar(
                        toHighlight.getFullYear(),
                        toHighlight.getMonth(),
                    );
                obj.isInputSet = true;
                obj.inputValue = toHighlight.toLocaleDateString();
                obj.highlightedDate = new Date(toHighlight).getDate();
                return obj;
            }

            case 'clearInput': {
                obj.isInputSet = false;
                return obj;
            }
            case 'showYearList': {
                obj.isYearListShown = true;
                return obj;
            }
            case 'hideYearList': {
                obj.isYearListShown = false;
                return obj;
            }
        }
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        calendar: {monthName, dates, month, year},
        currentTime: {month: curMonth, year: curYear},
        highlightedDate,
        isCalendarShown,
        isInputSet,
        isYearListShown,
        inputValue,
    } = state;

    useEffect(() => {
        if (state.isCalendarShown) {
            const fnPar = {type: 'hideCalendar'};
            clickOutsideHide(calRef, dispatch, fnPar);
        }
        if (state.isYearListShown) {
            const fnPar = {type: 'hideYearList'};
            clickOutsideHide(yearListRef, dispatch, fnPar);
        }
    }, [state]);
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <div className='relative w-full mb-3'>
                <input
                    type='text'
                    id={id}
                    placeholder='10/22/2021'
                    className='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    defaultValue={isInputSet ? inputValue : ''}
                />
                {!isCalendarShown && (
                    <button
                        onClick={() => dispatch({type: 'showCalendar'})}
                        type='button'
                        className='absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-slate-400 rounded-r-md border border-slate-500 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    >
                        <HiCalendar size={20} />
                    </button>
                )}

                {/** calendar container */}
                {isCalendarShown &&
                    (isYearListShown ? (
                        <YearList
                            months={monthMap}
                            curYear={DATE.getFullYear()}
                            fn={dispatch}
                            Ref={yearListRef}
                        />
                    ) : (
                        <div
                            ref={calRef}
                            className='z-10 p-2 bg-white rounded-lg border border-gray-200 shadow-md absolute left-0 top-[50px] w-full'
                        >
                            {/* Calendar Header */}
                            <div className='flex justify-between'>
                                <button
                                    type='button'
                                    onClick={() =>
                                        dispatch({
                                            type: 'setCalendar',
                                            data: {month: month - 1, year},
                                        })
                                    }
                                >
                                    <HiArrowSmLeft size={22} />
                                </button>
                                <button
                                    onClick={() =>
                                        dispatch({type: 'showYearList'})
                                    }
                                    type='button'
                                >{`${monthName + ' ' + year}`}</button>
                                <button
                                    type='button'
                                    onClick={() =>
                                        dispatch({
                                            type: 'setCalendar',
                                            data: {month: month + 1, year},
                                        })
                                    }
                                >
                                    <HiArrowSmRight size={22} />
                                </button>
                            </div>
                            {/* Calendar Content */}
                            <div className='grid grid-cols-7 gap-2 text-center'>
                                <div className='text-red-400'>Su</div>
                                <div>Mo</div>
                                <div>Tu</div>
                                <div>We</div>
                                <div>Th</div>
                                <div>Fr</div>
                                <div>Sa</div>
                                <CalendarDate
                                    calendar={state.calendar}
                                    fn={dispatch}
                                    highlightedDate={highlightedDate}
                                />
                            </div>
                            {/* Calendar Footer */}
                            <div className='flex justify-between mt-2 text-sm px-2 text-blue-400'>
                                <button
                                    title='Clear input'
                                    type='button'
                                    onClick={() =>
                                        dispatch({type: 'clearInput'})
                                    }
                                >
                                    Clear
                                </button>
                                <button
                                    title='Close'
                                    type='button'
                                    onClick={() =>
                                        dispatch({type: 'hideCalendar'})
                                    }
                                >
                                    <HiX size={20} />
                                </button>
                                <button
                                    type='button'
                                    title="Show today's date"
                                    onClick={() =>
                                        dispatch({
                                            type: 'setCalendar',
                                            data: {
                                                year: curYear,
                                                month: curMonth,
                                            },
                                        })
                                    }
                                >
                                    Today
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}
