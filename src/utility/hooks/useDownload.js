import {BASE_URL, getAuthorizationHeader} from "../Utils"
import axios from "axios"

export const useDownload = (fileId) => {

    axios({
        url: `${BASE_URL}/sales/file/${fileId}`, //your url
        method: 'GET',
        responseType: 'blob', // important
        headers: {
            Authorization: getAuthorizationHeader()
        }
    }).then((response) => {
        // create file link in browser's memory
        console.log(response)
        const href = URL.createObjectURL(response.data)

        // create "a" HTML element with href to file & click
        const link = document.createElement('a')
        link.href = href
        link.setAttribute('download', new Date().toISOString().substring(0, 10)) //or any other extension
        document.body.appendChild(link)
        link.click()

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link)
        URL.revokeObjectURL(href)
    })
}