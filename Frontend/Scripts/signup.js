const signup = () => {
    const payload = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    }

    fetch("https://localhost:8080/users/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).then(res => {
        alert(res.message)
    }).catch(err => {
        alert(err.error);
    })
}