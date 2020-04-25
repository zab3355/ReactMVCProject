const handlePassChange = (e) => {
  e.preventDefault();
  
  $("#errorContainer").animate({width:'hide'},350);
  
  if($("#oldPass").val() == '' || $("#newPass").val() == ''|| $("#newPass2").val() == ''){
    handleError("All fields are required!");
    return false;
  }
  
  sendAjax('POST', $("#passwordForm").attr("action"), $("#passwordForm").serialize(), redirect);
  
  return false;
};

const PasswordForm = (props) => {
  //renders form
  return (
  	<form id="passwordForm" 
      name="passwordForm" 
      onSubmit={handlePassChange} 
      action="/changePassword" 
      method="POST" 
      className="passwordForm">
        <div id="changeForm">
        <h3 id="change">Change Password:</h3>
        <input id="oldPass" type="password" name="oldPass" placeholder="Old Password"/>
        <input id="newPass" type="password" name="newPass" placeholder="New Password"/>
        <input id="newPass2" type="password" name="newPass2" placeholder="Re-type Password"/><br/><br/>
        <input type="hidden" name="_csrf" value={props.csrf}/>
        <input className="changePassword" type="submit" value="Update" />
          <div id="passwordInfo">
            <p>In order to change your password, enter in your old one, then enter in your new password, and click the update button.</p>
            <p><strong>PLEASE NOTE:</strong> Signout is automatic and <strong>WILL</strong> occur when the password is updated!</p>
        </div>
      </div>
    </form>
  );
};

const getAccountToken = (url) =>{
  sendAjax('GET', '/getAccountToken', null, (result) =>{
 setupPassChangeForm(result.csrfToken);
    });
};

$(document).ready(function(){
  getAccountToken();
});
