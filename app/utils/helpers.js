export const getLocale = (y, m, d) => new Date(y, m, d).toLocaleDateString();
export const addZero = (n) => (parseInt(n) < 10 ? `0${n}` : n);
export const getDateStyle = (y, m, obj) => {
    const notCalendarDate =
        new Date(y, m).getMonth() !== new Date(obj.str).getMonth();
    const defaultStyle = 'hover:bg-slate-500 rounded-full';
    let bgColor = '';
    let textColor = '';
    if (notCalendarDate) {
        if (!obj.idx) textColor = 'text-red-300';
        else textColor = 'text-slate-400';
    } else {
        if (!obj.idx) textColor = 'text-red-400';
        // else textColor = 't'
    }

    return `${defaultStyle} ${bgColor} ${textColor}`;
};

export const mergeStyles = (obj) => {
    let style = '';
    for (let key in obj) style += `${obj[key]} `;
    return style;
};
