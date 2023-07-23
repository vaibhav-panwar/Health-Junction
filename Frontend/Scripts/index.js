//tokenCheck
window.onload = tokenCheck();
function tokenCheck() {
  let token = localStorage.getItem("userToken");
  if (token) {
    document.getElementById("login").remove()
    document.getElementById("signup").remove()
    let name = localStorage.getItem("userName");
    let li1 = document.createElement("li");
    let a1 = document.createElement("a");
    a1.innerText = name;
    a1.setAttribute("href", "./view/myAppointments.html");
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

// function slideshow(slide){

    
  Imagein = 0;
  let firstImage = document.getElementById("fImage");

let upImage = document.createElement("img");
// upImage.src = slide[0]
// firstImage.append(upImage)

// setInterval(function(){
//  Imagein++;

//  if(Imagein==slide.length-1){
//   Imagein=0;
//  }
//  upImage.src = slide[Imagein];

//  firstImage.append(upImage);



// },2000)

// }

setInterval(function() {
  Imagein++;

  if (Imagein === slide.length) {
    Imagein = 0;
  }
  upImage.src = slide[Imagein];

  // Remove any previously appended image
  while (firstImage.firstChild) {
    firstImage.removeChild(firstImage.firstChild);
  }

  firstImage.append(upImage);
}, 2000);


let slide = [ "https://www.healthhub.sg/sites/assets/Assets/Programs/healthy-living/images/masthead-d-04.jpg",
"https://www.healthhub.sg/sites/assets/Assets/Programs/mindsg/phase-2/images/feature/intro-carousel-img1.png",
"https://www.healthhub.sg/sites/assets/Assets/Programs/healthy-living/images/masthead-d-02.jpg",
"https://www.healthhub.sg/sites/assets/Assets/Programs/healthy-living/images/masthead-d-03.jpg"];

window.addEventListener("load", function () {

slideshow(slide)
// add event-listeners;
});

document.getElementById("el").addEventListener("click",(e)=>{
  e.preventDefault();
  window.location.href = "./view/expertLogIn.html"
})