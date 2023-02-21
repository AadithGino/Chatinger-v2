import { adminLogin } from "../../../API/ChatApiCalls"
import { ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS } from "../../Constants/adminConstants"

export const adminLoginAction = (email, password) => async (dispath) => {
    dispath({ type: ADMIN_LOGIN_REQUEST })
    try {
        const { data } = await adminLogin(email, password)
        dispath({ type: ADMIN_LOGIN_SUCCESS, payload: data })
        localStorage.setItem("chatingerAdminInfo", JSON.stringify(data));
    } catch (error) {
        dispath({
            type: ADMIN_LOGIN_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.response.data,
        })
    }

}