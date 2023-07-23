//token check
window.onload = tokenCheck();
function tokenCheck(){
    let token = localStorage.getItem("userToken");
    if(!token){
        window.location.href = "./login.html"
    }
    else{
        document.getElementById("login").remove()
        document.getElementById("signup").remove()
        let name = localStorage.getItem("userName");
        let li1 = document.createElement("li");
        let a1 = document.createElement("a");
        a1.innerText = name;
        a1.setAttribute("href", "./myAppointments.html");
        a1.classList.add("navbar-link");
        li1.setAttribute("id", "username");
        li1.append(a1);
        let li2 = document.createElement("li");
        let a2 = document.createElement("a");
        a2.innerText = "Log Out";
        a2.setAttribute("href", "#");
        a2.classList.add("navbar-link");
        li2.setAttribute("id", "logout");
        li2.append(a2);
        li2.addEventListener("click",(e)=>{
            e.preventDefault();
            localStorage.setItem("userToken","");
            localStorage.setItem("userName","");
            location.reload();
        })
        document.querySelector(".navbar-list").append(li1, li2);
    }
}


/////////////////////////////////////
let slotDate;
let slotExpert;
let slotTime;
// calender js

const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");
// getting new date, current year and month
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();
// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}" value = "${i}">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
    jmd();
}
renderCalendar();
prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

function jmd() {
    let arr = document.querySelectorAll(".days>li");
    arr.forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(el.value);
            let date = new Date(`${currYear}-${currMonth + 1}-${el.value+1}`);
            let cDate = new Date();
            if (date >= cDate) {
                for (let i = 0; i < arr.length; i++) {
                    arr[i].classList.remove("jmd");
                }
                el.classList.add("jmd");
                slotDate = date;
            }
            else {
                alert("select date correctly")
            }
        })
    })
}

let selectService = document.getElementById("service");
let selectExpert = document.getElementById("expert");
let selectSlot = document.getElementById("slot");
selectService.addEventListener("change", (e) => {
    e.preventDefault();
    if (selectService.value) {
        serviceValues(selectService.value);
    }
})

selectExpert.addEventListener("change", (e) => {
    e.preventDefault();
    slotExpert = selectExpert.value
})

selectSlot.addEventListener("change", (e) => {
    e.preventDefault();
    slotTime = selectSlot.value;
})

document.getElementById("book").addEventListener("click", (e) => {
    e.preventDefault();
    if (!slotDate) {
        alert("please select date");
        return
    }
    if (!slotExpert) {
        alert("please select your expert");
        return
    }
    if (!slotTime) {
        alert("please select your slot");
        return
    }
    let obj = {
        expertID: slotExpert,
        date: slotDate,
        slot: slotTime
    }
    fetch("http://localhost:8080/appointments/create", {
        method: "POST",
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        },
        body: JSON.stringify(obj)
    })
        .then((res) => res.json())
        .then((data) => {
            if (!data.isError) {
                alert(data.message);
            }
            else {
                alert(data.error)
            }
        })
        .catch((err) => {
            alert(err);
        });
})

function serviceValues(value) {
    selectExpert.innerHTML = "";
    fetch(`http://localhost:8080/experts/${value}`)
        .then((res) => res.json())
        .then((data) => {
            if (!data.isError) {
                let b = document.createElement("option");
                b.setAttribute("value", "");
                b.innerText = "Select Expert";
                selectExpert.append(b);
                data.data.forEach((el) => {
                    let a = document.createElement("option");
                    a.setAttribute("value", el.id);
                    a.innerText = el.name;
                    selectExpert.append(a);
                })
            }
            else {
                alert(data.error)
            }
        })
        .catch((err) => {
            alert(err)
        })
}