import {BASE_URL, TOKEN} from "../Utils"
import {toast} from "react-toastify"

export const useDownloadXlsGET = ({fileId, fileName}) => {

    const downUrl = `${BASE_URL}/file/v1/attachment/download/${fileId}`

    fetch(downUrl, {
        method: "GET",
        dataType: "binary",
        xhrFields: {
            responseType: 'blob'
        },
        headers: {
            "Authorization": `Bearer ${localStorage.getItem(TOKEN)}`
        },
        processData: false
    })
        .then(res => {
            if (res?.status === 403) {
                toast.error("pin-kod noto`g`ri!")
            } else if (res?.status === 404) {
                toast.error("siz izlagan fayl topilmadi!")
            } else {
                res.blob()
                    .then(
                        (result) => {
                            const windowUrl = window.URL || window.webkitURL
                            const url = windowUrl.createObjectURL(result)
                            const link = document.createElement('a')

                            link.setAttribute('href', url)
                            link.setAttribute('download', fileName)

                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                            URL.revokeObjectURL(url)
                        },
                        (error) => {
                            console.log(error)
                        }
                    )
            }
        })
}