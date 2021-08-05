// 当前默认时间
var currenTime = {
    year: 2020,
    month: 4,
    day: 26,
    week: 7,
    hour: 13,
    minute: 23,
    second: 45
};
// 获取当月的天数
function getMonthDay(year, month) {
    var monthToDayMap = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 4 == 0 || year % 400 == 0) {
        monthToDayMap[1] = 29;
    }
    return monthToDayMap[month - 1];
}
// 当前罗盘时钟对象构造函数  用于存储罗盘时钟的数据 
function Clock(currenTime) {
    // 当前年，月，日，时分秒，星期
    this.currenYear = currenTime.year;
    this.currentMonth = currenTime.month;
    this.currentDay = currenTime.day;
    this.currentWeek = currenTime.week;
    this.currentHour = currenTime.hour;
    this.currentMinute = currenTime.minute;
    this.currentSecond = currenTime.second;
    //  当前月对应的天数
    this.monthToDays = getMonthDay(currenTime.year, currenTime.month);
    // 所有月份的dom集合
    this.monthsDom = [];
    // 所有日期的dom集合
    this.daysDom = [];
    // 所有星期的dom集合
    this.weeksDom = [];
    // 所有小时的dom集合
    this.hoursDom = [];
    // 所有分钟的dom集合
    this.minutesDom = [];
    // 所有秒钟的dom集合
    this.secondsDom = [];
    // 每天星期数的名称集合
    this.weeks = ['一', '二', '三', '四', '五', '六', '日'];
    // 所有年份的dom节点包裹层
    this.yearWrapper = null;
    // 所有月份的dom节点包裹层
    this.monthWrapper = null;
    // 所有日期的dom节点包裹层
    this.dayWrapper = null;
    // 所有星期的dom节点包裹层
    this.weekWrapper = null;
    // 所有小时的dom节点包裹层
    this.hourWrapper = null;
    // 所有分钟的dom节点包裹层
    this.minuteWrapper = null;
    // 所有秒钟的dom节点包裹层
    this.secondWrapper = null;
    // 整个罗盘时钟的dom结构
    this.dom = this.createDom();
    // 罗盘时钟的动画效果实现
    this.init = function () {
        this.animate()
    }
}
// 创建罗盘时钟dom结构
Clock.prototype.createDom = function () {
    // 最外层包裹层
    var dom = document.createElement('div');
    dom.className = 'clock-box';
    // 所有年份的dom包裹层  添加年份信息
    var yearDom = document.createElement('div');
    yearDom.className = 'year';
    this.yearWrapper = yearDom;
    yearDom.innerText = this.currenYear + '年';
    // 所有月份的dom包裹层   添加月份信息
    var monthDom = document.createElement('div');
    monthDom.className = 'month';
    this.monthWrapper = monthDom;
    for (var i = 1; i <= 12; i++) {
        var oSpan = document.createElement('span');
        oSpan.innerText = i + '月';
        monthDom.appendChild(oSpan)
        this.monthsDom.push(oSpan);
    }
    // 所有日期的dom包裹层 添加日期信息
    var dayDom = document.createElement('div');
    dayDom.className = 'day';
    this.dayWrapper = dayDom;
    for (var i = 1; i <= this.monthToDays; i++) {
        var oSpan = document.createElement('span');
        oSpan.innerText = i + '日';
        dayDom.appendChild(oSpan);
        this.daysDom.push(oSpan);
    }
    // 所有星期的dom包裹层  添加所有星期信息
    var weekDom = document.createElement('div');
    weekDom.className = 'week';
    this.weekWrapper = weekDom;
    for (var i = 0; i < this.weeks.length; i++) {
        var oSpan = document.createElement('span');
        oSpan.innerText = '星期' + this.weeks[i];
        weekDom.appendChild(oSpan);
        this.weeksDom.push(oSpan);
    }
    // 所有小时的dom包裹层  添加所有小时信息
    var hourDom = document.createElement('div');
    hourDom.className = 'hour';
    this.hourWrapper = hourDom;
    for (var i = 0; i < 24; i++) {
        var oSpan = document.createElement('span');
        oSpan.innerText = i + '时';
        hourDom.appendChild(oSpan);
        this.hoursDom.push(oSpan);
    }
    // 所有分钟的包裹层  添加所有分钟信息
    var minuteDom = document.createElement('div');
    minuteDom.className = 'minute';
    this.minuteWrapper = minuteDom;
    for (var i = 0; i < 60; i++) {
        var oSpan = document.createElement('span');
        oSpan.innerText = i + '分';
        minuteDom.appendChild(oSpan);
        this.minutesDom.push(oSpan);
    }
    // 所有秒钟的包裹层   添加所有秒钟的信息
    var secondDom = document.createElement('div');
    secondDom.className = 'second';
    this.secondWrapper = secondDom;
    for (var i = 0; i < 60; i++) {
        var oSpan = document.createElement('span');
        oSpan.innerText = i + '秒';
        secondDom.appendChild(oSpan);
        this.secondsDom.push(oSpan);
    }
    // 插入到罗盘时钟的包裹层中
    dom.appendChild(yearDom);
    dom.appendChild(monthDom);
    dom.appendChild(dayDom);
    dom.appendChild(weekDom);
    dom.appendChild(hourDom);
    dom.appendChild(minuteDom);
    dom.appendChild(secondDom);
    return dom;
}
Clock.prototype.animate = function () {
    // 月份的旋转动画
    setTimeout(() => {
        var len = this.monthsDom.length;
        var deg = 360 / len;
        for (var i = 0; i < len; i++) {
            this.monthsDom[i].style.transform = 'rotateZ(-' + i * deg + 'deg)'
        }
    }, 0)
    // 日的旋转动画 需要等到月份出现之后再旋转
    setTimeout(() => {
        var len = this.daysDom.length;
        var deg = 360 / len;
        for (var i = 0; i < len; i++) {
            this.daysDom[i].style.transform = 'rotateZ(-' + i * deg + 'deg)'
        }
    }, 1000);
    // 星期的旋转动画 需要等到日出现之后再旋转
    setTimeout(() => {
        var len = this.weeksDom.length;
        var deg = 360 / len;
        for (var i = 0; i < len; i++) {
            this.weeksDom[i].style.transform = 'rotateZ(-' + i * deg + 'deg)'
        }
    }, 2000);
    // 时钟的旋转动画需要等到星期出来之后再旋转
    setTimeout(() => {
        var len = this.hoursDom.length;
        var deg = 360 / len;
        for (var i = 0; i < len; i++) {
            this.hoursDom[i].style.transform = 'rotateZ(-' + i * deg + 'deg)'
        }
    }, 2500);
    // 分钟的旋转动画  需要等到小时全部出现之后再旋转
    setTimeout(() => {
        var len = this.minutesDom.length;
        var deg = 360 / len;
        for (var i = 0; i < len; i++) {
            this.minutesDom[i].style.transform = 'rotateZ(-' + i * deg + 'deg)'
        }
    }, 3500);
    // 秒钟的旋转动画  需要等到分钟全部出现之后再旋转
    setTimeout(() => {
        var len = this.secondsDom.length;
        var deg = 360 / len;
        for (var i = 0; i < len; i++) {
            this.secondsDom[i].style.transform = 'rotateZ(-' + i * deg + 'deg)'
        }
    }, 4500);
    // 旋转到当前时间的位置  并且每秒钟进行时间更新
    setTimeout(() => {
        var monthDeg = 360 / this.monthsDom.length;
        var dayDeg = 360 / this.daysDom.length;
        var weekDeg = 360 / 7;
        var hourDeg = 360 / 24;
        var minuteDeg = 360 / 60;
        var secondDeg = 360 / 60;
        var date = new Date();
        this.currenYear = date.getFullYear();
        this.currentMonth = date.getMonth() + 1;
        this.currentDay = date.getDate();
        this.currentWeek = date.getDay();
        this.currentHour = date.getHours();
        this.currentMinute = date.getMinutes();
        this.currentSecond = date.getSeconds();
        // 当前月份的旋转角度
        var curMonthDeg = (this.currentMonth - 1) * monthDeg;
        // 当前日期的旋转角度
        var curDayDeg = (this.currentDay - 1) * dayDeg;
        // 当前星期的旋转角度
        var curWeekDeg = (this.currentWeek - 1) * weekDeg;
        // 当前小时的旋转角度
        var curHourDeg = (this.currentHour) * hourDeg;
        // 当前分钟的旋转角度
        var curMinuteDeg = (this.currentMinute) * minuteDeg;
        // 当前秒钟的旋转角度
        var curSecondDeg = (this.currentSecond) * secondDeg;
        // 每秒钟更新时钟
        setInterval(() => {
            // 获取当前的事件
            var date = new Date();
            this.currenYear = date.getFullYear();
            this.currentMonth = date.getMonth() + 1;
            this.currentDay = date.getDate();
            this.currentWeek = date.getDay();
            this.currentHour = date.getHours();
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
            // 每秒钟需要让秒针旋转  在原来的旋转角度基础上顺时针旋转secondDeg度 
            curSecondDeg += secondDeg;
            // 如果当前秒钟为0  则说明分钟已进一   那么分钟也需要在原来的基础上旋转minuteDeg度
            if (this.currentSecond == 0) {
                curMinuteDeg += minuteDeg
            }
            // 如果分钟秒钟都为0  则说明当前的小时已经进一  那么小时的角度也需要在原来的基础上旋转hourDeg度
            if (this.currentMinute == 0 && this.currentSecond == 0) {
                curHourDeg += hourDeg;
            }
            // 如果是一天的24时  则说明已经过去一天  那么需要更新天和星期的罗盘  角度继续顺时针旋转指定的角度
            if (this.currentHour == 0 && this.currentSecond == 0 && this.currentMinute == 0) {
                curDayDeg += dayDeg;
                curWeekDeg += weekDeg;
            }
            // 如果当前更新到1号  那么说明月份需要更新   
            if (this.currentDay == 1 && this.currentHour == 0 && this.currentSecond == 0 && this.currentMinute == 0) {
                curMonthDeg += monthDeg;
                // 更新月份对应的日期结构
                this.changeMonthDay()
            }
            // 渲染到页面当中
            this.yearWrapper.innerText = this.currenYear + '年'
            this.monthWrapper.style.transform = 'rotate(' + curMonthDeg + 'deg)'
            this.dayWrapper.style.transform = 'rotate(' + curDayDeg + 'deg)';
            this.weekWrapper.style.transform = 'rotate(' + curWeekDeg + 'deg)';
            this.hourWrapper.style.transform = 'rotate(' + curHourDeg + 'deg)';
            this.minuteWrapper.style.transform = 'rotate(' + curMinuteDeg + 'deg)';
            this.secondWrapper.style.transform = 'rotate(' + curSecondDeg + 'deg)';
        }, 1000)
    }, 5500)
}

Clock.prototype.changeMonthDay = function () {
    // 获取当前月对应的天数
    this.monthToDays = getMonthDay(this.currenYear, this.currentMonth);
    // 更新日期的dom集合
    this.daysDom = [];
    this.dayWrapper.innerHTML = '';
    var deg = 360 / this.monthToDays;
    for (var i = 1; i <= this.monthToDays; i++) {
        var oSpan = document.createElement('span');
        oSpan.innerText = i + '日';
        this.dayWrapper.appendChild(oSpan);
        oSpan.style.transform = 'rotateZ(-' + (i - 1) * deg + 'deg)'
        this.daysDom.push(oSpan);
    }
}


var c = new Clock(currenTime);
var wrapper = document.getElementsByClassName('wrapper')[0];
wrapper.appendChild(c.dom)
c.init();