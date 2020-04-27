// Handling Password Change Form
const handleChangePass = (e) => {
    e.preventDefault();
  $("#errorMessage").animate({width: 'hide'}, 350);
  
    if ($('#oldPass').val() == '' || $('#newPass').val() == '' || $('#newPass2').val() == '') {
      handleError('Please fill out each field!');
      return false;
    }
  
    if ($('#newPass').val() !== $('#newPass2').val()) {
      handleError('Passwords do not match');
      return false;
    }
  
  $("#errorMessage").animate({
    width: 'toggle'
  }, 350);
    
    //Load the success message and change password if there are no errors
    makeAjaxCallback($('#changePassword').attr('action'), $('#changePassword').serialize(), (data) => {
    //success handler
      handleSuccess('Password changed!');
    $("#success").text="Success!";
    $("#success").animate({width: 'hide'}, 350);
    });
  
    return false;
  };


//Password Change Form
  const ChangePassForm = (props) => {
    return (
      <form id="changePassword" name="changePassword" 
      action="/changePassword" method="POST" 
      class="recipeForm" onSubmit={handleChangePass}>
        <input id="oldPass" type="password" name="oldPass" placeholder="Old Password" />
        <input id="newPass" type="password" name="newPass" placeholder="New Password" />
        <input id="newPass2" type="password" name="newPass2" placeholder="Repeat New Password" />
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Change Password" />
    </form>
    )
  };

//Password Change Form Setup
const setupPassChangeForm = function(csrf) {
    ReactDOM.render(
        <ChangePassForm csrf={csrf} />, document.querySelector("#changePassForm")
    );
};

//based upon URL, will setup specific renders
const getToken = () =>{
  sendAjaxCall('GET', '/getToken', null, (result) =>{
      setupPassChangeForm(result.csrfToken); 
    });
};

$(document).ready(function(){
  getToken();
});
