function signup(){
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;

    fetch("http://localhost:5000/api/auth/signup",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"},
            body:JSON.stringify({name,email,password})
})
 .then(res => res.json())
  .then(data => {
    alert("Signup successful");
    window.location.href = "login.html";
  });
}


function login(){
    const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem("userId", data.userId);
    window.location.href = "index.html";
  });
}
