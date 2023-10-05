import { EMAIL_REGEX, PASSWORD_REGEX } from "../constants/constantes";

export const validarLogin = (login) => {
    return !/\s/.test(login);
}

export const validarEmail = (email) => {
    return EMAIL_REGEX.test(email);
}

export const validarPass = (password) => {
    return PASSWORD_REGEX.test(password);
}