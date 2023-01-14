// function for signup
function signUp(event) {
    // prevents page reload
    event.preventDefault();

    // get spinner
    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    // get values from inputs
    const getName = document.getElementById("name").value;
    const getEmail = document.getElementById("email").value;
    const getPass = document.getElementById("password").value;
    const getConfirmPass = document.getElementById("confirmPassword").value;

    if (getName === "" || getEmail === "" || getPass === "" || getConfirmPass === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }

    if (getConfirmPass !== getPass) {
        Swal.fire({
            icon: 'info',
            text: 'Password do not match',
            confirmButtonColor: '#2D85DE'
        })
    }

    else {
        const signData = new FormData();
        signData.append("name", getName);
        signData.append("email", getEmail);
        signData.append("password", getPass);
        signData.append("password_confirmation", getConfirmPass);

        const signReq = {
            method: 'POST',
            body: signData
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/register_admin";

        fetch(url, signReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })

                setTimeout(() => {
                    location.href = "index.html"
                }, 3000)
            }
            else {
                Swal.fire({
                    Icon: 'info',
                    text: 'Registration Unsuccessful!',
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }

}

// function to log in 

function logIn(event){
    event.preventDefault();
    const getSpin = document.querySelector('.spin');
    getSpin.style.display = 'inline-block';

    const getEmail = document.getElementById('email').value
    const getPass = document.getElementById('password').value

    if (getEmail === "" || getPass === ""){
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }

    else{
        const logForm = new FormData();
        logForm.append("email", getEmail);
        logForm.append("password", getPass);

        const logReq = {
            method: 'POST',
            body: logForm
        }

        const url = "http://pluralcodesandbox.com/yorubalearning/api/admin_login";

        fetch(url, logReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            localStorage.setItem("admin", JSON.stringify(result));
            const getItem = localStorage.getItem("admin");
            const theItem = JSON.parse(getItem );

            if (theItem.hasOwnProperty("email")){
                location.href = "dashboard.html"
            }

            else{
                Swal.fire({
                    icon: 'Warninig',
                    text: 'Login unsuccessful',
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none"; 
            }
        })


        .catch(error => console.log('error', error))       

        }
}

//function for dashboard APIs

function dashboardApi(){
    const mypageModal = document.querySelector(".pagemodal");
    mypageModal.style.display = "block";

    const myToken = localStorage.getItem("admin");
    const theToken = JSON.parse(myToken);
    const token = theToken.token 

    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${Token}`);

    const dashReq = {
        method: 'GET',
        header: dashHeader

    }

    const url = "http://pluralcodesandbox.com/yorubalearning/api/admin_dashboardapi";

    fetch(url, dashReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            const getCat = document.getElementById("category");
            const getLearn = document.getElementById("learnmat");
            const getSubcat = document.getElementById("subcat");
            const getQuize = document.getElementById("quiz");
            const getStudent = document.getElementById("student");

            getCat.innerHTML = `${result.total_number_of_categories}`;
            getLearn.innerHTML = `${result.total_number_of_learnmaterials}`;
            getSubcat.innerHTML = `${result.total_number_of_subcategories}`;
            getQuize.innerHTML = `${result.total_number_of_quize}`;
            getStudent.innerHTML = `${result.total_number_of_sstudents}`;

            mypageModal.style.display = "none";

})

    .catch(error => console.log('error', error));  

    // dashboardApi  

}