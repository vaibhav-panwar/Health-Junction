window.onload = tokenCheck();
function tokenCheck() {
    let token = localStorage.getItem("userToken");
    if (!token) {
        window.location.href = "./login.html"
    }
    else {
        document.getElementById("login").remove()
        document.getElementById("signup").remove()
        let name = localStorage.getItem("userName");
        let li1 = document.createElement("li");
        let a1 = document.createElement("a");
        a1.innerText = name;
        a1.setAttribute("href", "#");
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
        li2.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.setItem("userToken", "");
            localStorage.setItem("userName", "");
            location.reload();
        })
        document.querySelector(".navbar-list").append(li1, li2);
    }
}
////////////////////////////////////////////////////////////////////////////////


let bigcont = document.getElementById("bigcont");
fetchdata();
function fetchdata() {
    fetch("http://localhost:8080/appointments/user", {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        }
    })
        .then((res) => res.json())
        .then((data) => {
            if (!data.isError) {
                bigcont.innerHTML = "";
                data.data.forEach((el) => {
                    let a = createCard(el.date, el.status, el.slot, el._id, el.expertDetails.name, el.expertDetails.specialisation);
                    bigcont.append(a);
                })
            }
        })
}

function createCard(date, status, slot, id, expert, service) {
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
        <p class="expert">Expert:${expert}</p>
        <p class="service">Service:${service}</p>`
    let btn = document.createElement("button");
    btn.classList.add("canc");
    btn.innerText = "Cancel";
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        cancelAppointment(id);
    })
    if (status == "pending") {
        card.append(btn);
    }
    return card
}

function cancelAppointment(apid) {
    let obj = {
        status: "cancel"
    }
    fetch(`http://localhost:8080/appointments/user/${apid}`, {
        method: "PATCH",
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${localStorage.getItem("userToken")}`
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