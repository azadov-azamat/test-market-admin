import html2canvas from 'html2canvas'
import FileSaver from 'file-saver'


function dataURLToBlob(dataURL) {
    const BASE64_MARKER = 'base64,'
    let parts
    let contentType
    let raw

    if (dataURL.indexOf(BASE64_MARKER) === -1) {
        parts = dataURL.split(',')
        contentType = parts[0].split(':')[1]
        raw = decodeURIComponent(parts[1])

        return new Blob([raw], {type: contentType})
    }

    parts = dataURL.split(BASE64_MARKER)
    contentType = parts[0].split(':')[1]
    raw = window.atob(parts[1])
    const rawLength = raw.length
    const uInt8Array = new Uint8Array(rawLength)

    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
    }

    return new Blob([uInt8Array], {type: contentType})
}

// Генерация и скачивание автоматический
function captureScreenshot() {
    const preview = document.querySelector('.preview-graphs')
    html2canvas(preview).then((canvas) => {
        const fileBlob = dataURLToBlob(canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream'))
        const fileName = `file.jpg`
        FileSaver.saveAs(fileBlob, fileName)
    })
}