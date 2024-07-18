

    function  getData(){
    var getUserData = document.querySelector('#getData')
    var getUserDataFromLocalStorage = JSON.parse(localStorage.getItem("UserData"));
    var userName = document.querySelector('#userName')
    userName.innerHTML = `${getUserDataFromLocalStorage.name}`
    getUserData.innerHTML = ` <ol>
    <li>Name : ${getUserDataFromLocalStorage.name}</li> 
    <li>Email :  ${getUserDataFromLocalStorage.email} </li>
    <li>Phone Number : ${getUserDataFromLocalStorage.phoneNumber} </li>
    </ol>`
    }
 

var userData = JSON.parse(localStorage.getItem("UserData"));
var userName = userData.name;
var welUser = document.getElementById("welUser");
welUser.innerText = userName;


    function redirection(){
        window.location.href = "./index.html"
    }
    function logout(){
        //localStorage.clear()
        setTimeout(redirection,0)
    }

    function addPost(){
        var title = document.getElementById("title");
        var description = document.getElementById("description");
        var posts = document.getElementById("posts");
    
        if(title.value.trim() && description.value.trim()){
            posts.innerHTML += `<div class="p-4">
            <div class="card">
                    <div class="card-header">
                      @Notes
                    </div>
                    <div class="card-body" style="background:#57a8ff">
                      <blockquote class="blockquote mb-0">
                        <p>${title.value}</p>
                        <footer class="blockquote-footer">${description.value}<cite title="Source Title"></cite></footer>
                      </blockquote>
                    </div>
                  </div>
                  </div>`;
                  
            var notesData = {
                title : title.value,
                description: description.value
            };
    
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please Enter Title & Description!",
                    });
                    }
                    localStorage.setItem("Notes Data", JSON.stringify(notesData));
                    title.value = "";
                    description.value = "";
    }
    