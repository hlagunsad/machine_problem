module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword,
  mobileNo
) => {
  const errors = {};
  if (username.length === 0) {
    errors.username = "Username must not be empty.";
  }

  if (email.length === 0) {
    errors.email = "Email must not be empty.";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if(!email.match(regEx)){
          errors.email = "Email must be a valid email address."
      }
  }

  if (password.length === 0) {
    errors.password = "Password must not be empty.";
  }else if(password.length <= 7){
    errors.password = "Password must be at least 8 characters."
  }else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match.";
  }else if (mobileNo.length === 0) {
    errors.mobileNo = "Mobile number must not be empty.";
  }

  return{
      errors,
      valid: Object.keys(errors).length < 1 
  }
};


module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.length === 0) {
        errors.username = "Username must not be empty.";
    }else if(password.length === 0){
        errors.password = "Password must not be empty.";
    }

    return{
        errors,
        valid: Object.keys(errors).length < 1 
    }
}