const dayNames = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thurs',
    'Fri',
    'Sat'
]

function todayForm() {
    const today = new Date();
    let month = today.getMonth() + 1;
    month = month >= 10 ? month : `0${month}`;
    let date = today.getDay();
    date = date >= 10 ? date : `0${date}`;
    const day = dayNames[today.getDay()];

    return `${month}/${date} ${day}`
}

export {todayForm}