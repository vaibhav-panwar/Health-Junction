window.onload = checkToken();
function checkToken() {
    let a = localStorage.getItem("expertToken");
    if (!a) {
        window.location.href = "../index.html"
    }
}

document.getElementById("logout").addEventListener("click",(e)=>{
    e.preventDefault();
    localStorage.setItem("expertToken","");
    location.reload();
})

let bigcont = document.getElementById("bigcont");
fetchdata();
function fetchdata() {
    fetch("http://localhost:8080/appointments/expert", {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${localStorage.getItem("expertToken")}`
        }
    })
        .then((res) => res.json())
        .then((data) => {
            if (!data.isError) {
                let count = 0;
                bigcont.innerHTML = "";
                data.data.forEach((el) => {
                    if (el.status == "pending") {
                        count++
                    }
                    let a = createCard(el.date, el.status, el.slot, el._id, el.userDetails.name);
                    bigcont.append(a);
                })
                document.getElementById("pend").innerText = count;
            }
        })
}

function createCard(date, status, slot, id, user) {
    let te = new Date(date);
    let ts = te.toDateString();
    let a;
    if (slot == "9-10") {
        a = "9AM-10PM"
    }
    else if (slot == "10-11") {
        a = "10AM-11AM"
    }
    else if (slot == "11-12") {
        a = "11AM-12PM"
    }
    else if (slot == "12-1") {
        a = "12PM-1PM"
    } else if (slot == "1-2") {
        a = "1PM-2PM"
    } else if (slot == "2-3") {
        a = "2PM-3PM"
    } else if (slot == "3-4") {
        a = "3PM-4PM"
    } else if (slot == "4-5") {
        a = "4PM-5PM"
    }
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<p class="date">Date:${ts}</p>
        <p class="status">Status: ${status}</p>
        <p class="slot">Slot:${a}</p>
        <p class="expert">User:${user}</p>`
    let div = document.createElement("div");
    div.classList.add("bg");
    let btn2 = document.createElement("button");
    btn2.classList.add("conf");
    btn2.innerText = "Confirm";
    btn2.addEventListener("click", (e) => {
        e.preventDefault();
        confirmAppointment(id);
    })
    let btn = document.createElement("button");
    btn.classList.add("canc");
    btn.innerText = "Cancel";
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        cancelAppointment(id);
    })
    div.append(btn2, btn);
    if (status == "pending") {
        card.append(div);
    }
    return card
}

function cancelAppointment(apid) {
    let obj = {
        status: "cancel"
    }
    fetch(`http://localhost:8080/appointments/expert/${apid}`, {
        method: "PATCH",
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${localStorage.getItem("expertToken")}`
        },
        body: JSON.stringify(obj)
    })
        .then((res) => res.json())
        .then((data) => {
            if (!data.isError) {
                alert(data.message)
                location.reload()
            }
            else {
                alert(data.error)
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function confirmAppointment(apid) {
    let obj = {
        status: "confirm"
    }
    fetch(`http://localhost:8080/appointments/expert/${apid}`, {
        method: "PATCH",
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${localStorage.getItem("expertToken")}`
        },
        body: JSON.stringify(obj)
    })
        .then((res) => res.json())
        .then((data) => {
            if (!data.isError) {
                alert(data.message)
                location.reload()
            }
            else {
                alert(data.error)
            }
        })
        .catch((err) => {
            console.log(err);
        })
}