$(document).ready(function() { 
    $('body').bootstrapMaterialDesign(); 
});

function login(){
    if($('#email').val() != "" && $('#password').val() != ""){
        firebase.auth().signInWithEmailAndPassword($('#email').val(), $('#password').val()).then(function(user){
            // setCookie("user_id", user.uid);
            // setCookie("user_name", user.displayName);
            // setCookie("user_email", user.email);
            window.location.href = 'schedule.html';
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode + ' ' + errorMessage);
        });
    } else {
        if($('#email').val() == "") $('#email-popover').popover('show');
        if($('#password').val() == "") $('#password-popover').popover('show');
    }
}