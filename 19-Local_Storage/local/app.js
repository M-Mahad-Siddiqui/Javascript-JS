/*
function registerForm(){

    var name = document.getElementById('fullName');
    var email = document.getElementById('emailAddress');
    var phoneNumber = document.getElementById('phoneNumber');
    var password = document.getElementById('password');
    var cpassword = document.getElementById('cpassword');

    if(name.value===''){
        Swal.fire({
            icon: "error",
            text: "Name Should Not be Empty!",
          });
    }else if(email.value===''){
        Swal.fire({
            icon: "error",
            text: "Email Should Not be Empty!",
          });
    
    }else if(phoneNumber.value===''){
        Swal.fire({
            icon: "error",
            text: "Phone Number Should Not be Empty!",
            
          });
    }
    else if(password.value===''){
        Swal.fire({
            icon: "error",
            text: "Password Should Not be Empty!",
          });
    }
    else if(cpassword.value==='' && password.value !==cpassword.value){
        Swal.fire({
            icon: "error",
            text: "Confirm Password Should Not be Empty!",
          });
    }
    else if(password.value !==cpassword.value){
        Swal.fire({
            icon: "error",
            text: "Confirm Password does not Matched!",
          });
    }
    else( Swal.fire({
        icon: "success",
        title: `${name.value} Successfully Registered `,
        showConfirmButton: false,
        timer: 1500
      }))

    var userData = {
        name: name.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
        cpassword: cpassword.value
    };

    localStorage.setItem("UserData", JSON.stringify(userData));
    setTimeout(()=>{
        window.location.href = "./dashbord.html"
    },0)

}



*/


document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    registerForm();
});

function registerForm() {
    var name = document.getElementById('fullName').value.trim();
    var email = document.getElementById('emailAddress').value.trim();
    var phoneNumber = document.getElementById('phoneNumber').value.trim();
    var password = document.getElementById('password').value.trim();
    var cpassword = document.getElementById('cpassword').value.trim();

    if (!name) {
        Swal.fire({
            icon: "error",
            text: "Name should not be empty!",
        });
        return;
    }
    if (!email) {
        Swal.fire({
            icon: "error",
            text: "Email should not be empty!",
        });
        return;
    }
    if (!phoneNumber || phoneNumber.length < 11) {
        Swal.fire({
            icon: "error",
            text: "Provide Correct Phone Number!",
        });
        return;
    }
    if (!password ||password.length < 8 ) {
        Swal.fire({
            icon: "error",
            text: "Password should not be empty! & Not Simple",
        });
        return;
    }
    if (!cpassword) {
        Swal.fire({
            icon: "error",
            text: "Confirm password should not be empty!",
        });
        return;
    }
    if (password !== cpassword) {
        Swal.fire({
            icon: "error",
            text: "Passwords do not match!",
        });
        return;
    }

    var userData = {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: password
    };

    localStorage.setItem("UserData", JSON.stringify(userData));

    Swal.fire({
        icon: "success",
        title: `${name} successfully registered`,
        showConfirmButton: true,    
        timer: 5000
    }).then(() => {
        window.location.href = "./dashbord.html";
    });
}


