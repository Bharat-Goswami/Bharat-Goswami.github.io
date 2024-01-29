
let hamMenuIcon = document.getElementById("ham-menu");
let navBar = document.getElementById("nav-bar");
let navLinks = navBar.querySelectorAll("li");

hamMenuIcon.addEventListener("click", () => {
  navBar.classList.toggle("active");
  hamMenuIcon.classList.toggle("fa-times");
});
navLinks.forEach((navLinks) => {
  navLinks.addEventListener("click", () => {
    navBar.classList.remove("active");
    hamMenuIcon.classList.toggle("fa-times");
  });
});


function openResume() {
  window.open(
    'https://drive.google.com/file/d/1qnen_Ze6CoP6YR9Ya3IJ2SLaeklLSj2B/view?usp=sharing',
    '_blank'
  );
}

function paddingFunction() {
  let x = doccument.getElementById("home")
  x.style.padding = "100px"
}

document.querySelector("form").addEventListener("submit", saveFile );



function saveFile(e) {

  e.preventDefault()


  let Formdata = JSON.parse(localStorage.getItem("portfolioData")) || []

  let name=document.getElementById("fname").value
  let email=document.getElementById("email").value
  let text=document.getElementById("subject").value
  
  let data = {
    "name": name,
    "email": email,
    "text": text
  }
  Formdata.push(data)
  localStorage.setItem("portfolioData", JSON.stringify(Formdata))
}

const sections = document.querySelectorAll("#home, #about, #skills, #projects, #github, #contact, #footer");


// Get all the navigation links
const navScroll = document.querySelectorAll('#nav-bar a');

// Function to highlight the current section in the navigation menu
function highlightNavLink() {
    let index = sections.length;

    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

    navScroll.forEach(link => link.classList.remove('active'));
    navScroll[index].classList.add('active');
}

// Add event listener for scroll
window.addEventListener('scroll', highlightNavLink);

// Add the feedback to the database

document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission
  
  // Get form values
  const name = document.getElementById('fname').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('subject').value;

  // Create an object with the form data
  const formData = {
    name: name,
    email: email,
    message: message
  };

  // Make a POST request to your server
  fetch('https://potpholio.onrender.com/users/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => response.json())
  .then(data => {
    if(data.error){
      showtost("Error");
    }
    else{
      showtost("Succesful");
    }
    sendEmail(formData);
    console.log('Success:', data);

    // Clear the form fields
    document.getElementById('fname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';

    // Optionally, you can also focus on the first field
    document.getElementById('fname').focus();
  })
  .catch((error) => {
    console.error('Error:', error);
    // Optionally, handle the error here
  });
});

// tost box
var tostBox = document.getElementById("tostBox");
function showtost(cre){
  console.log(cre)
  var tost = document.createElement("div");
  tost.classList.add("tost");
  tost.innerHTML = "<i class='bx bxs-x-circle'></i>" +"<h2>Oops Try with different name or Email id</h2>";
  if(cre.includes('Succesful')){
    tost.classList.add("sucess");
    tost.innerHTML = "<i class='bx bx-check-circle'></i>" +"<h2>That you your feedback is appriciated and please check your email😊</h2>";
  }
  tostBox.appendChild(tost);
  setTimeout(()=>{
    tost.remove();
  },2000);

}


// Email JS

function sendEmail(formData){
    emailjs.send('service_30bvx1p','template_th7030g',formData)
}
