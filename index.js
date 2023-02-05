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


// function for load table data 

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
            icon: 'success',
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
                    icon: 'error',
                    text: 'Failed to Create Category!',
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }
            

}


// function for display catgory

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
                    <div class="categorySubBody">
                        <img src= ${item.image} alt="" class ="catImage">  
                    </div>
                    <p>${item.name}</p>
                    <div class="categorySubBody">
                        <button class="button button-red font-weight-700" type="button" onclick = "openCategory(${item.id})" >Update</button>
                        <button  class="button button-blue2 font-weight-700" type="button" onclick = "deleteCategory(${item.id})" >Delete</button>
                    </div>
                </div>`

            })
            getCategoryList.innerHTML = categoryData; 
            console.log(getCategoryList);
        

    })
    .catch(error => console.log('error', error));
}

displayCategory();


//  function for delete category

function deleteCategory(myid) {
    const getToken = localStorage.getItem('admin');
    const token = JSON.parse(getToken);
    const myToken = token.token;
    const listHeaders = new Headers();
    listHeaders.append("Authorization", `Bearer ${myToken}`);
    const delReq = {
        method: 'GET',
        headers: listHeaders
    }
    const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/delete_category/${myid}`;
    fetch(url, delReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.status === "success") {
            Swal.fire({
                icon: 'success',
                text: `${result.message}`,
                confirmButtonColor: "#2D85DE"
            })
            setTimeout(() => {
                location.reload();
            }, 3000)
        }
        else {
            Swal.fire({
                icon: 'info',
                text: 'Unsuccessful',
                confirmButtonColor: "#2D85DE"
            })
        }
    })
    .catch(error => console.log('error', error));
}


let uniqueId;
function openCategory(modalId) {
    localStorage.setItem("id", modalId)

    const myModal = document.getElementById("mymodal3");
    myModal.style.display = "block";

    const getToken = localStorage.getItem('admin');
    const token = JSON.parse(getToken);
    const myToken = token.token;

    const catHeader = new Headers();
    catHeader.append("Authorization", `Bearer ${myToken}`);

    uniqueId = modalId

    const upReq = {
        method: 'GET',
        headers: catHeader
    }

    const url =  `https://pluralcodesandbox.com/yorubalearning/api/admin/get_details?category_id=${uniqueId}`;

    fetch(url, upReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const getUpName = document.getElementById("updateName")
        const getUpImg = document.getElementById("updateNameImage")

        getUpName.setAttribute('value', `${result.name}`);
        getUpImg.setAttribute('value', `${result.image}`)

        })
    .catch(error => console.log('error', error));
 }


 function chooseImg(event) {
    event.preventDefault();
    
    const div1 = document.querySelector(".getWrapp")
    const div2 = document.querySelector(".wrapper")

    div1.style.display = "none";
    div2.style.display = "block";
 }

 function updateCategory(event){
    event.preventDefault();

    const getSpin = document.querySelector(".spin2");
    getSpin.style.display = "inline-block";

    const getUpname = document.getElementById("updateName").value;
    const getUimg1 = document.getElementById("updateNameImage").value;
    const getUimg2 = document.getElementById("updateImage").files[0];
    const getId = localStorage.getItem("id");

    if (getUpname === "") {
        Swal.fire({
            icon: 'info',
            text: 'the name field is required!',
            confirmButtonColor: "#2D85DE"
        })
        getSpin.style.display = "none";
    }
    else {
        const getToken = localStorage.getItem('admin');
        const token = JSON.parse(getToken);
        const myToken = token.token;

        const listHeaders = new Headers();
        listHeaders.append("Authorization", `Bearer ${myToken}`);

        const upFormData = new FormData();
        upFormData.append("name", getUpname);
        upFormData.append("image", getUimg1);
        upFormData.append("image", getUimg2);
        upFormData.append("category_id", getId);

        const upReq = {
            method: 'POST',
            headers: listHeaders,
            body: upFormData
        };

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/update_category";

        fetch(url, upReq)
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
                    location.reload();
                }, 3000)
            }
            else{
                Swal.fire({
                    icon: 'info',
                    text: 'Unsuccessful!',
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }
}

 function closeModal3() {
    const myModal = document.getElementById("mymodal3");
    myModal.style.display = "none";
 }

//  function for update emailand name

function upDateAdmin(event){
    event.preventDefault();

    // const getSpin = document.querySelector(".spin2");
    // getSpin.style.display = "inline-block";

    const getUpname = document.getElementById("updateName").value;
    const getUpemail = document.getElementById("updateEmail").value;

    if (getUpname === "" & getUpemail === "") {
        Swal.fire({
            icon: 'info',
            text: 'All the fields are required!',
            confirmButtonColor: "#2D85DE"
        })
        getSpin.style.display = "none";
    }
    else {
        const getToken = localStorage.getItem('admin');
        const token = JSON.parse(getToken);
        const myToken = token.token;

        const upForm = new FormData();
        upForm.append("Authorization", `Bearer ${myToken}`);

        const updateFormData = new FormData();
        updateFormData.append("name", getUpname);
        updateFormData.append("email", getUpemail);

        const upReq = {
            method: 'POST',
            headers: upForm,
            body: updateFormData
        };

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_update_profile";

        fetch(url, upReq)
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
                    location.reload();
                }, 3000)
            }
            else{
                Swal.fire({
                    icon: 'info',
                    text: 'Unsuccessful!',
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }


}














// function for log out

function logout(){
    setTimeout(() => {
        localStorage.clear();
        location.href = "index.html"
    }, 1000)
}