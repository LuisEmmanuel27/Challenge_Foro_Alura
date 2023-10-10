export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{1,10}$/;
export const BASE_URL_BDD = "http://localhost:8080/";

export const GET_USER_DATA = () => {
    const authToken = localStorage.getItem("userData");
    return authToken ? JSON.parse(authToken).data : null;
};