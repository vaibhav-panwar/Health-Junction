

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