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

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin_login";

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


// function adminIdName(){
//     const adminName = document.getElementById("adminId");
//     adminIdName.style.display = "block"

// }
// adminName.innerHTML = 

//function for dashboard APIs

function dashboardApi(){
    
    const mypageModal = document.querySelector(".pagemodal");
    mypageModal.style.display = "block";

    const myToken = localStorage.getItem("admin");
    const theToken = JSON.parse(myToken);
    const token = theToken.token 

    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);

    const dashReq = {
        method: 'GET',
        headers: dashHeader

    }

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";

    fetch(url, dashReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            const getCat = document.getElementById("category");
            const getLearn = document.getElementById("learnmat");
            const getSubcat = document.getElementById("subCat");
            const getQuiz = document.getElementById("quiz");
            const getStudent = document.getElementById("student");
            const getAdminId = document.getElementById("adminId");

            getStudent.innerHTML = `${result.total_number_of_students}`;
            getCat.innerHTML = `${result.total_number_of_categories}`;
            getLearn.innerHTML = `${result.total_number_of_learningmaterial}`;
            getQuiz.innerHTML = `${result.total_number_of_quize}`;
            getSubcat.innerHTML = `${result.total_number_of_subcategories}`;
            getAdminId.innerHTML = `${result.admin_name}` 

            mypageModal.style.display = "none";

})

    .catch(error => console.log('error', error));  
 
}
    dashboardApi();

    
    // function for studentModal

    function studentModal(event){
    event.preventDefault();
    const myModal = document.querySelector(".mymodal");
    myModal.style.display = "block";

    const myToken = localStorage.getItem("admin");
    const theToken = JSON.parse(myToken);
    const token = theToken.token; 

    const topThree = new Headers();
    topThree.append("Authorization", `Bearer ${token}`);

    const topThreeStudent = {
        method: 'GET',
        headers: topThree

    }
    let data = [];
    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students";
    
    fetch(url, topThreeStudent)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const getStudent = document.querySelector(".allstudent");
        if(result.length === 0){
            getStudent.innerHTML = "No Record Found"
        }
        else {
            result.map((item) =>{
                data += `
                <div class="search-card">
                    <div class="theItem">
                        <p>Name:</p>
                        <p>${item.name}</p>
                    </div>
                    <div class="theItem">
                        <p>Email:</p>
                        <p>${item.email}</p>
                    </div>
                    <div class="theItem">
                        <p>Phone:</p>
                        <p>${item.phone_number}</p>
                    </div>
                    <div class="theItem">
                        <p>Position:</p>
                        <p>${item.position}</p>
                    </div>
                    <div class="theItem">
                        <p>Score:</p>
                        <p>${item.total_score}</p>
                    </div>
                </div>`

            })
            getStudent.innerHTML = data; 
        }

    })
    .catch(error => console.log('error', error));
}


// function to close the mymodal

function closeDashModal() {
    const closeModal = document.getElementById("dash-modal");
    closeModal.style.display = "none"
}
      
     
    

// function for log out

function logout(){
    Swal.fire({
        icon: 'Success',
        text: 'Login successful',
        confirmButtonColor: '#2D85DE'
    }) 
    setTimeout(() => {
        localStorage.clear();
        location.href = "index.html"
    }, 3000)
}


// function for table data 

function loadTable(){
    const dashboardTable = document.getElementById("table-id");

    const myToken = localStorage.getItem("admin");
        const theToken = JSON.parse(myToken);
        const token = theToken.token; 
    
        const allStudents = new Headers();
        allStudents.append("Authorization", `Bearer ${token}`);

        const getAllStudents = {
            method: 'GET',
            headers: allStudents
          };

    let tableData = []

    const url =  "https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students";

  fetch(url, getAllStudents)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.map((item) => {
            tableData += `<tr>
                                
                                <td>${item.name}</td>
                                <td>${item.email}</td>
                                <td>${item.phone_number}</td>
                                <td>${item.total_score}</td>
                                <td>${item.position}</td>
                            </tr>`
                            })
        document.getElementById("table-id").innerHTML = tableData;
    })
    
    
    .catch(error => console.log('error', error));
}

loadTable()


// function for create categories

function createCat(){
    const getSpin = document.querySelector('.spin');
    getSpin.style.display = 'inline-block';

    const myToken = localStorage.getItem("admin");
    const theToken = JSON.parse(myToken);
    const token = theToken.token; 
    
    const allCategory = new Headers();
        allCategory.append("Authorization", `Bearer ${token}`);

    const enterCategory = document.querySelector('#enterCat').value;
    const uploadDoc = document.querySelector('#uploadFile').files[0];
    console.log(enterCategory);
    

    if (enterCategory === "" || uploadDoc === ""){
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }

    else{
        const createForm = new FormData();
        createForm.append("name", enterCategory);
        createForm.append("image", uploadDoc);

        const createReq = {
            method: 'POST',
            headers:  allCategory,
            body: createForm
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/create_category";
        
        fetch(url, createReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })


            }
            else {
                Swal.fire({
                    Icon: 'info',
                    text: 'Failed to Create Category!',
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }
            

}


function displayCategory(){
    const myToken = localStorage.getItem("admin");
    const theToken = JSON.parse(myToken);
    const token = theToken.token; 

    const catList = new Headers();
    catList.append("Authorization", `Bearer ${token}`);
        

    const data = {
        method: 'GET',
        headers: catList,

    }

    let categoryData = []
    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/category_list"

    fetch(url, data)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const getCategoryList = document.querySelector(".allCategories");
            result.map((item) => {
                categoryData += 
                `<div class="search-card">
                    <div class="theItem">
                        <img src= ${item.image} alt="" class ="catImage">  
                    </div>
                    <p>${item.name}</p>
                    <div class="theItem">
                        <button class="button button-red font-weight-700" type="button" onclick="updateCategory" ${item.id}>Update</button>
                        <button class="button button-blue2 font-weight-700" type="button" onclick="deleteCategory" ${item.id}>Delete</button>
                    </div>
                </div>`

            })
            getCategoryList.innerHTML = categoryData; 
            console.log(getCategoryList);
        

    })
    .catch(error => console.log('error', error));
}

displayCategory()

