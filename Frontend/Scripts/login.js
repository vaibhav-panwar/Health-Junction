let elform = document.querySelector("form");
elform.addEventListener("submit",(e)=>{
    e.preventDefault();
    let obj = {
        email:document.getElementById("email").value,
        password:document.getElementById("password").value
    }
    fetch("http://localhost:8080/users/login",{
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
            localStorage.setItem("userToken",data.token);
            localStorage.setItem("userName",data.data.name);
            window.location.href = "../index.html"
        }
        else{
            alert(data.error)
        }
    })
    .catch((err)=>{
        console.log(err);
    });
})