function register_booking() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var mobile = document.getElementById("phone").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var person = document.getElementById("people").value;
    var e_check = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    var m_check = /^\d{10}$/;
    if(name == "" || email == "" || mobile == "" || date == "" || time == ""){
        return alert("Enter all the fields to book your seat..");
    }
    else {
        if(!e_check.test(email)){
            return alert("Enter the valid Email address");
        }
        if(!m_check.test(mobile)){
            return alert("Enter the valid Mobile Number");
        }
        else {
        }
    }

}
