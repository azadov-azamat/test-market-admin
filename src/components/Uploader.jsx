import {Button, ListGroup, ListGroupItem} from 'reactstrap'
import {useDropzone} from 'react-dropzone'
import {DownloadCloud, FileText, X} from 'react-feather'

const FileUploader = ({ files, setFiles, handleUpload }) => {

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        onDrop: handleUpload
    })

    const renderFilePreview = file => {
        if (file.type.startsWith('image')) {
            return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
        } else {
            return <FileText size='28' />
        }
    }

    const handleRemoveFile = file => {
        const filtered = files.filter(i => i.name !== file.name)
        setFiles([...filtered])
    }

    const renderFileSize = size => {
        if (Math.round(size / 100) / 10 > 1000) {
            return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
        } else {
            return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
        }
    }

    const fileList = files?.map((file, index) => (
        <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
            <div className='file-details d-flex align-items-center'>
                <div className='file-preview me-1'>{renderFilePreview(file)}</div>
                <div>
                    <p className='file-name mb-0'>{file.name}</p>
                    <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
                </div>
            </div>
            <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
                <X size={14} />
            </Button>
        </ListGroupItem>
    ))

    return (
        <div className='border rounded p-1'>
            {!files?.length ? (
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                        <DownloadCloud size={64} />
                        <h5>Drop Files here or click to upload</h5>
                        <p className='text-secondary'>
                            Drop files here or click{' '}
                            <a href='/' onClick={e => e.preventDefault()}>
                                browse
                            </a>{' '}
                            thorough your machine
                        </p>
                    </div>
                </div>
            ) : (
                <ListGroup className='my-2'>{fileList}</ListGroup>

            )}
        </div>
    )
}

export default FileUploader
