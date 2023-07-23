let elform = document.querySelector("form");
elform.addEventListener("submit",(e)=>{
    e.preventDefault()
    let obj = {
        name:document.getElementById("name").value,
        age:document.getElementById("age").value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        email:document.getElementById("email").value,
        password:document.getElementById("password").value
    }
    fetch("http://localhost:8080/users/register",{
        method:"POST",
        headers:{
            "Content-type":"Application/json"
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(!data.isError){
            alert(data.message);
            window.location.href = "./login.html"
        }
        else{
            alert(`Error:${data.error}`)
        }
    })
    .catch((err)=>{
        console.log(err)
    })
})