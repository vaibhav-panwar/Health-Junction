const login = () => {
    const payload = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    }

    fetch("https://localhost:8080/users/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).then(res => {
        alert(res.message);
        let token = res.token;
    }).catch(err => {
        alert(err.error);
    })
}