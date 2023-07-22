const signup = () => {
    const payload = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    }
    console.log(payload);
    fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).then(res => {
        console.log(res);
        alert(res.message);
    }).catch(err => {
        alert(err.error);
        console.log(err);
    })
}