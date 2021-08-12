export const setHeaders = () => {
    const headers = {
        headers : {
            "x-auth-token" : localStorage.getItem("accessToken"),
        },
    }

    return headers
}