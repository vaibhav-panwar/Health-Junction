const login = () => {
    const payload = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    }

    fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).then(res => {
        alert(res.message);
        //console.log(res);
        let token = res.token;
        localStorage.setItem("token",token);
    }).catch(err => {
        alert(err.error);
    })
}