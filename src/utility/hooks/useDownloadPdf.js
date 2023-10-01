import {toast} from "react-toastify"
import {BASE_URL, TOKEN} from "../Utils"

export const useDownloadPdfPost = (data) => {

    const downUrl = `${BASE_URL}/file/v1/public/download`

    fetch(downUrl, {
        method: "POST",
        dataType: "binary",
        xhrFields: {
            responseType: 'blob'
        },
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
        },
        processData: false,
        body: JSON.stringify(data)
    })
        .then(res => {
                if (res?.status === 403) {
                    toast.error("pin-kod noto`g`ri!")
                } else if (res?.status === 404) {
                    toast.error("siz izlagan fayl topilmadi!")
                } else {
                    res.arrayBuffer().then(result => {
                        const file = new Blob([result], {type: 'application/pdf'})

                        const fileURL = URL.createObjectURL(file)
                        const link = document.createElement('a')
                        link.href = fileURL
                        link.download = `file.pdf`
                        link.click()
                    })
                }
            }
        )
}

export const useDownloadPdfGet = (fileId, fileName) => {

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
                    res.arrayBuffer().then(result => {
                        const file = new Blob([result], {type: 'application/pdf'})

                        const fileURL = URL.createObjectURL(file)
                        const link = document.createElement('a')
                        link.href = fileURL
                        link.download = fileName
                        link.click()
                    })
                }
            }
        )
}
