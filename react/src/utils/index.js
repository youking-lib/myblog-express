
export const formatTime = (date) => {
    var _date = new Date(date)
    return `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`
}

export generateTagColor from './generateTagColor'
