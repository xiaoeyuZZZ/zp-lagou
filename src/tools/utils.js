
// 获取这个月的第一天
export function beginTime(year, month) {
    if (month.length <= 1) {
        month = '0' + month
    }
    let startTime = year + '-' + month + '-' + '01'
    return startTime
}

// 获得这个月的最后一天
export function lastTime(year, month) {
    if (month.length <= 1) {
        month = '0' + month
    }
    let day = new Date(year, month, 0)
    let lastdate = year + '-' + month + '-' + day.getDate()
    return lastdate
}

// 获得这个季度的第一天和最后一天
export function quarterTime(year, month) {
    let beginTime, lastTime
    if (month >= 3 && month <= 5) {
        beginTime = year + '-03-01'
        lastTime = year + '-05-31'
        return {startAt: beginTime, endAt: lastTime}
    } else if (month >= 6 && month <= 8) {
        beginTime = year + '-06-01'
        lastTime = year + '-08-30'
        return {startAt: beginTime, endAt: lastTime}
    } else if (month >= 9 && month <= 11) {
        beginTime = year + '-09-01'
        lastTime = year + '-11-30'
        return {startAt: beginTime, endAt: lastTime}
    } else if (month === 12) {
        beginTime = year + '-12-01'
        lastTime = this.lastTime(year + 1, 2)
        return {startAt: beginTime, endAt: lastTime}
    } else {
        beginTime = year - 1 + '-12-01'
        lastTime = this.lastTime(year, 2)
        return {startAt: beginTime, endAt: lastTime}
    }
}

// 将Date类型的数据转换成 yyyy-mm-dd的字符串类型
export function dateString(date) {
    let year, month, day
    year = date.getFullYear()
    month = date.getMonth() + 1
    day = date.getDate()
    if (month < 10) {
        if (day < 10) {
            return year + '-0' + month + '-0' + day
        } else {
            return year + '-0' + month + '-' + day
        }
    } else {
        if (day < 10) {
            return year + '-' + month + '-0' + day
        } else {
            return year + '-' + month + '-' + day
        }
    }
}

// 获得今年的第一天和最后一天，返回一个对象
export function yearTime() {
    let dt = new Date()
    let year = dt.getFullYear();
    return {startAt: year + '-01-01', endAt: year + '-12-31'}
}

// 判断快捷时间选择转换成开始时间和结束时间
export function quickTimeSelect(quickTimeSlot, date) {
    let year, month, dt
    if (quickTimeSlot === '1') {
        return {startAt: this.dateString(date), endAt: this.dateString(date)}
    } else if (quickTimeSlot === '2') {
        dt = new Date()
        month = dt.getMonth() + 1
        year = dt.getFullYear()
        return {startAt: this.beginTime(year, month), endAt: lastTime(year, month)}
    } else if (this.quickTimeSlot === '3') {
        dt = new Date()
        month = dt.getMonth() + 1
        year = dt.getFullYear()
        return quarterTime(year, month)
    } else {
        return yearTime()
    }
}
