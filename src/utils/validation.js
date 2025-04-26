export function isValidEmail(email){
    return(
        typeof email==="string" &&
        email.includes("@")&&
        email.includes(".") &&
        email.indexOf("@")<email.lastIndexOf(".")&&
        email.indexOf("@")>0 &&
        email.indexOf(".")>0 
    );
}
export function isValidPassword(mot_de_passe){
    return(
        typeof mot_de_passe==="string" &&
        mot_de_passe.length>=8 && 
        /[A-Z]/.test(mot_de_passe) &&
        /[a-z]/.test(mot_de_passe) &&
        /[0-9]/.test(mot_de_passe) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(mot_de_passe)
    );
}

