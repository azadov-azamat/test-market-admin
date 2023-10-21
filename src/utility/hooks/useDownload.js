import {BASE_URL, getAuthorizationHeader} from "../Utils"
import axios from "axios"

export const useDownload = (uri) => {

    axios({
        url: `${BASE_URL}/${uri}`,
        method: 'GET',
        responseType: 'blob',
        headers: {
            Authorization: getAuthorizationHeader()
        }
    }).then((response) => {
        const href = URL.createObjectURL(response.data)
        const link = document.createElement('a')
        link.href = href
        link.setAttribute('download', new Date().toISOString().substring(0, 10)) //or any other extension
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(href)
    })
}