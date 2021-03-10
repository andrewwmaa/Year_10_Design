function checkUserFirstName()
{
    var userSurname = document.getElementById("userFirstName").value;
    var flag = false;
    if(userSurname === "")
        flag = true;
    if(flag)
        document.getElementById("userFirstNameError").style.display = "block";
    else
        document.getElementById("userFirstNameError").style.display = "none";
}

function checkUserSurname()
{
    var userSurname = document.getElementById("userSurname").value;
    var flag = false;
    if(userSurname === "")
        flag = true;
    if(flag)
        document.getElementById("userSurnameError").style.display = "block";
    else
        document.getElementById("userSurnameError").style.display = "none";
}

function checkUserEmail()
{
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag = true;
    if(userEmail.value.match(userEmailFormate))
        flag = false;
    if(flag)
        document.getElementById("userEmailError").style.display = "block";
    else
        document.getElementById("userEmailError").style.display = "none";
}

function checkUserPassword()
{
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag = true;
    if(userPassword.value.match(userPasswordFormate))
        flag = false;
    if(flag)
        document.getElementById("userPasswordError").style.display = "block";
    else
        document.getElementById("userPasswordError").style.display = "none";
}

function checkUserBio()
{
    var userBio = document.getElementById("userBio").value;
    var flag = false;
    if(flag)
        document.getElementById("userBioError").style.display = "block";
    else
        document.getElementById("userBioError").style.display = "none";
}

function signUp()
{
    var userFirstName = document.getElementById("userFirstName").value;
    var userSurname = document.getElementById("userSurname").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userFirstNameFormatValidate = /^([A-Za-z.\s_-])/;    
    var userEmailFormatValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormatValidate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserFirstNameValid = userFirstName.match(userFirstNameFormatValidate);
    var checkUserEmailValid = userEmail.match(userEmailFormatValidate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormatValidate);

    if(checkUserFirstNameValid == null)
        return checkUserFirstName();
    else if(userSurname === "")
        return checkUserSurname();
    else if(checkUserEmailValid == null)
        return checkUserEmail();
    else if(checkUserPasswordValid == null)
        return checkUserPassword();
    else
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => 
        {
            var user = firebase.auth().currentUser;
            var uid;

            if (user != null) 
                uid = user.uid;
            
            var ref = firebase.database().ref('Users');
            var userData = 
            {
                userFirstName: userFirstName,
                userSurname: userSurname,
                userEmail: userEmail,
                userPassword: userPassword,
                userCountry: "Canada",
                userFavouriteBook: "Book Title",
                userFavouriteGenre: "Genre",
                userBio: "User biography",
            }
            ref.child(uid).set(userData);
            console.log("Account Created");
            window.open("../index.html");
        }).catch((error) => 
        {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}

function checkUserInEmail()
{
    var userInEmail = document.getElementById("userInEmail");
    var userEmailFormatValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag = true;
    if(userInEmail.value.match(userEmailFormatValidate))
        flag = false;
    if(flag)
        document.getElementById("userInEmailError").style.display = "block";
    else
        document.getElementById("userInEmailError").style.display = "none";
}

function checkUserInPassword()
{
    var userInPassword = document.getElementById("userInPassword");
    var userPasswordFormatValidate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag = true;
    if(userInPassword.value.match(userPasswordFormatValidate))
        flag = false;
    if(flag)
        document.getElementById("userInPasswordError").style.display = "block";
    else
        document.getElementById("userInPasswordError").style.display = "none";
}

function signIn()
{
    var userInEmail = document.getElementById("userInEmail").value;
    var userInPassword = document.getElementById("userInPassword").value;
    var userEmailFormatValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormatValidate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserEmailValid = userInEmail.match(userEmailFormatValidate);
    var checkUserPasswordValid = userInPassword.match(userPasswordFormatValidate);

    if(checkUserEmailValid == null)
        return checkUserInEmail();
    else if(checkUserPasswordValid == null)
        return checkUserInPassword();
    else
    {
        console.log("Signing in, please wait.");
        firebase.auth().signInWithEmailAndPassword(userInEmail, userInPassword).then((success) => 
        {
            console.log("Sign In Successful");
            firebase.auth().onAuthStateChanged(function(user) 
            {
                console.log(user.uid);
                if (user) 
                {
                    localStorage.userID = user.uid;
                    window.location = './pages/data.html';
                }
            });
        }).catch((error) => 
        {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }
}

function saveProfile()
{
    let userFirstName = document.getElementById("userFirstName").value 
    let userSurname = document.getElementById("userSurname").value 
    let userCountry = document.getElementById("userCountry").value 
    let userFavouriteBook = document.getElementById("userFavouriteBook").value 
    let userFavouriteGenre = document.getElementById("userFavouriteGenre").value 
    let userBio = document.getElementById("userBio").value
    var userFirstNameFormatValidate = /^([A-Za-z.\s_-])/; 
    var checkUserFirstNameValid = userFirstName.match(userFirstNameFormatValidate);
    if(checkUserFirstNameValid == null)
        return checkUserFirstName();
    else if(userSurname === "")
        return checkUserSurname();
    else
    {
        var firebaseRef = firebase.database().ref('Users');
        var userData = 
        {
            userFirstName: userFirstName,
            userSurname: userSurname,
            userCountry: userCountry,
            userFavouriteBook: userFavouriteBook,
            userFavouriteGenre: userFavouriteGenre,
            userBio: userBio
        }
        firebaseRef.child(localStorage.userID).set(userData);
        console.log("Profile Updated");
        window.location="data.html";
    }
}

function signOut()
{
    firebase.auth().signOut().then(function() 
    {
        console.log("Sign Out Successful");
        window.open("../index.html", "_self");
    }).catch(function(error) 
    {
        let errorMessage = error.message;
        console.log(errorMessage);
    });
}

