function gotop() {
    window.scrollTo(0,0);
}

document.querySelector('#show-login').addEventListener('click',function(){
    document.querySelector('.popup').classList.add('active');
});
document.querySelector('.popup .close-btn').addEventListener('click',function(){
    document.querySelector('.popup').classList.remove('active');
});



const currentDate = document.querySelector(".current-date"),
daysTag = document.querySelector(".days"),
prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];


const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),//getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),//getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),//getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth ,0).getDate();//getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`; 
        
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched 
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                && currYear === new Date().getFullYear() ? "active" : "";
        let isMarked = i === 28 && currMonth === 9 && currYear === 2023 ? "marked" : ""; // เพิ่มเงื่อนไขสำหรับวันที่ 28 ตุลาคม 2566
        liTag += `<li class="${isToday} ${isMarked}">${i}</li>`;            
    }

    for (let i = lastDayofMonth; i < 6; i++) {  //creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`; 
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}         
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => { // adding click event on both icons
        currMonth = icon.id === "prev" ? currMonth - 1 :currMonth + 1;

        if(currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});

function hideLoadingPage() {
    // document.getElementById("loading-overlay").style.display = 'none';
    // document.getElementById("loading-indicator").style.display = 'none';
    document.getElementById("onload1").style.display = 'none';
    document.getElementById("onload2").style.display = 'none';
}

setTimeout(hideLoadingPage, 1000);

