function reverseStr(str) {
    var listOfChar = str.split('');
    var reverseListOfChar = listOfChar.reverse();
    var reversedStr = reverseListOfChar.join('');
    return reversedStr;

}

function isPalindrome(str) {
    var reverse = reverseStr(str);
    if (str === reverse) {
        return true;
    } else {
        return false;
    }
}

function convertDateToStr(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    }
    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormat(date) {
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindrome(date) {
    var listOfPali = getAllDateFormat(date);
    var isPali = false;

    for (let index = 0; index < listOfPali.length; index++) {
        if (isPalindrome(listOfPali[index])) {
            isPali = true;
            break;
        }
    }

    return isPali;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 400 === 0) {
        return true;
    }
    return false;
}

function getNextPali(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = month + 1;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = month + 1;
            }
        }
    } else {
        if (day > daysInMonth(month - 1)) {
            day = 1;
            month = month + 1;
        }
    }

    if (month > 12) {
        month = 1;
        year = year + 1;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}


function getNextPaliDate(date){
    var ctr = 0;
    var nextDate = getNextPali(date);

    while(1){
ctr = ctr + 1 ;
var isPalin =  checkPalindrome(nextDate);
if (isPalin) {
    break;
}    
nextDate = getNextPali(nextDate);
    }

    return [ctr , nextDate];
}

var date = {
    day: 5,
    month: 9,
    year: 2022
}

//console.log(checkPalindrome(date));
// console.log(isPalindrome("242"));


var dateInput = document.querySelector("#bday-input");
var btn = document.querySelector("#btn");
var output = document.querySelector("#output");

function clickHandler(e){
  var str = dateInput.value;
  if (str !== '') {
    var listOfDate = str.split('-');
    var date = {
        day : Number( listOfDate[2]),
        month : Number(listOfDate[1]),
        year : Number(listOfDate[0])
    };

    var isPalind = checkPalindrome(date);
    if (isPalind) {
        output.innerText = "Yes , your bday is palindrome";
    }else{
        var [ctr , nextDate] = getNextPaliDate(date);
        output.innerText = "The next palindrome date is :" + nextDate;
    }
  }
}

btn.addEventListener("click" , clickHandler);