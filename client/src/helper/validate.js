import toast from 'react-hot-toast'

/**validate login page username */
export async function usernameValidate(values){
    const error = usernameVerify({},values);

    return error
}
/**validate password export */
export async function passwordValidate(values){
    const errors = passwordVerify({},values)
}
/** validate password */
function passwordVerify(errors = {}, values){
    
    if(!values.password){
        errors.password= toast.error("Password Required...!")
    }else if(values.password.includes(" ")){
        errors.password = toast.error("Invalid Password...!")
    }else if(values.password.length < 4){
        errors.password = toast.error("Password must be more than 4 character")
    }
}



/**validate username */
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error("Username Required...!") 
    }else if(values.username.includes(" ")){
        error.username = toast.error('Inavlid username...!')
    }

    return error
}

/**validate reset password */

export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);
    if(values.password !== values.confirm_password){
        errors.exist= toast.error("Password not match..!")
    }
    return errors;
}
/**validate register */
export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);
    
    return errors

}
/**validate email */
function emailVerify(error={}, values){
    if(!values.email){
        error.email = toast.error("Email Required...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Invalid Email...!")
    }

    return error;
}
/** validate profile page */
export async function profileValidation(values){
    const errors = emailVerify({}, values);

    return errors;
}