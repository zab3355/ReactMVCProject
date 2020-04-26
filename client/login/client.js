const handleLogin = (e) =>{
  e.preventDefault();
  
  $("#errorMessage").animate({width: 'hide'}, 350);
  $("#success").animate({width: 'hide'}, 350);
  
  if($("#user").val() == '' || $("#pass").val() == ''){
    handleError("Username or password is empty!");
    return false;
  }
  
  console.log($("input[name=_csrf]").val());
  
  sendAjaxCall('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  
  return false;
};

const handleSignup = (e) =>{
  e.preventDefault();
  
  $("#errorMessage").animate({width: 'hide'}, 350);
  $("#success").animate({width: 'hide'}, 350);
  
  if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == ''){
    handleError("All fields are required!");
    return false;
  }
  
  if($("#pass").val() !== $("#pass2").val()){
    handleError("Passwords do not match!");
    return false;
  }  
  
  sendAjaxCall('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  
  return false;
};

const handleAbout = (e) =>{
  e.preventDefault();
}

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

const AboutWindow = (props) => {
  return /*#__PURE__*/React.createElement("div", {
    id: "actionSection",
    name: "aboutSection",
    action: "/about",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("h1",  {
    htmlFor: "title",
    id: "titleAbout"
  }, "About Recipe Resort"), 
     /*#__PURE__*/React.createElement("p", {
    htmlFor: "title",
    id: "titleCaption"
  }, "Welcome to Recipe Resort! Here you and other users can create and share your own recipes online! To get started please Signup, create a username and password, and then Login! After this, you will be able to create a recipe, store it into our database, and put whatever information you'd like on that Recipe. What are you waiting for? Get started and share your recipe today!"),
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

const createAboutWindow= (csrf) =>{
  ReactDOM.render(
    <AboutWindow csrf={csrf} />,
    document.querySelector("#content"),
  );
};

const setup = (csrf) =>{
  const loginButton = document.querySelector("#loginButton");
  const signupButton = document.querySelector("#signupButton");
  const aboutButton = document.querySelector("#aboutButton");
  aboutButton.addEventListener("click", (e) =>{
    e.preventDefault();
    createAboutWindow(csrf);
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
  sendAjaxCall('GET', '/getToken', null, (result) =>{
    setup(result.csrfToken);
  });
};

$(document).ready(function(){
  getToken();
});