const handleLogin = (e) =>{
  e.preventDefault();
  
  $("#domoMessage").animate({width: 'hide'}, 350);
  
  if($("#user").val() == '' || $("#pass").val() == ''){
    handleError("Username or password is empty!");
    return false;
  }
  
  console.log($("input[name=_csrf]").val());
  
  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  
  return false;
};

const handleSignup = (e) =>{
  e.preventDefault();
  
  $("#domoMessage").animate({width: 'hide'}, 350);
  
  if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == ''){
    handleError("All fields are required!");
    return false;
  }
  
  if($("#pass").val() !== $("#pass2").val()){
    handleError("Passwords do not match!");
    return false;
  }  
  
  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  
  return false;
};

const handleChangePassword = (e) =>{
  e.preventDefault();
  
  $("#domoMessage").animate({width: 'hide'}, 350);
  
  if($("#oldPass").val() == '' || $("#newPass").val() == '' || $("#newPass2").val() == ''){
    handleError("All fields are required!");
    return false;
  }
  
  if($("#newPass").val() !== $("#newPass2").val()){
    handleError("Passwords do not match!");
    return false;
  }  
    
  if($("#pass").val() !== $("#oldPass").val()){
    handleError("Old password does not match!");
    return false;
  }  
  
  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  
  return false;
};

const LoginWindow = (props) =>{
  return(
  <form id="loginForm" name="loginForm"
        onSubmit={handleLogin}
        action="/login"
        method='POST'
        className="mainForm"
    >
    <label htmlFor="username">Username: </label>
    <input id="user" type="text" name="username" placeholder="username" />
    <label htmlFor="pass">Password: </label>
    <input id="pass" type="password" name="pass" placeholder="password" />
    <input type="hidden" name="_csrf" value={props.csrf} />
    <input className="formSubmit" type="submit" value="Sign in" />
  </form>
  );
};

const SignupWindow = (props) =>{
  return(
  <form id="signupForm" name="signupForm"
        onSubmit={handleSignup}
        action="/signup"
        method='POST'
        className="mainForm"
    >
    <label htmlFor="username">Username: </label>
    <input id="user" type="text" name="username" placeholder="username" />
    <label htmlFor="pass">Password: </label>
    <input id="pass" type="password" name="pass" placeholder="password" />
    <label htmlFor="pass2">Password: </label>
    <input id="pass2" type="password" name="pass2" placeholder="retype password" />    
    <input type="hidden" name="_csrf" value={props.csrf} />
    <input className="formSubmit" type="submit" value="Sign Up" />
  </form>
  );
};

const ChangePasswordWindow = (props) =>{
  return(
  <form id="changePasswordForm" name="changePasswordForm"
        onSubmit={handleLogin}
        action="/login"
        method='POST'
        className="mainForm"
    >
    <label htmlFor="oldPass">Old Password: </label>
    <input id="pass" type="text" name="oldPass" placeholder="Old Password" />
    <label htmlFor="newPass">New Password: </label>
    <input id="newPass" type="newPass" name="newPass" placeholder="New Password" />
    <label htmlFor="newPass">Confirm New Password: </label>
    <input id="newPass2" type="newPass2" name="newPass2" placeholder="New Password" />
    <input type="hidden" name="_csrf" value={props.csrf} />
    <input className="formSubmit" type="submit" value="Change Password" />
  </form>
  );
};

const createLoginWindow = (csrf) =>{
  ReactDOM.render(
    <LoginWindow csrf={csrf} />,
    document.querySelector("#content"),
  );
};

const createSignupWindow = (csrf) =>{
  ReactDOM.render(
    <SignupWindow csrf={csrf} />,
    document.querySelector("#content"),
  );
};

const createChangePasswordWindow= (csrf) =>{
  ReactDOM.render(
    <ChangePasswordWindow csrf={csrf} />,
    document.querySelector("#content"),
  );
};

const setup = (csrf) =>{
  const loginButton = document.querySelector("#loginButton");
  const signupButton = document.querySelector("#signupButton");
  const changePasswordButton = document.querySelector("#changePasswordButton");
  changePasswordButton.addEventListener("click", (e) =>{
    e.preventDefault();
    createChangePasswordWindow(csrf);
    return false;   
  });
    
  signupButton.addEventListener("click", (e) =>{
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });
  
  loginButton.addEventListener("click", (e) =>{
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
  
  createLoginWindow(csrf); //default view
};

const getToken = () =>{
  sendAjax('GET', '/getToken', null, (result) =>{
    setup(result.csrfToken);
  });
};

$(document).ready(function(){
  getToken();
});