import React, { useState } from "react"
import { FaCheckCircle, FaFileUpload } from "react-icons/fa"
import { useAuth } from "../../Contexts/AuthContext"
import { storage, db } from "../../firebase"
import { ROOT_FOLDER } from "../../Hooks/useFolder"
import { nanoid } from "nanoid"
import ReactDOM from "react-dom"
import { Toast, ProgressBar } from "react-bootstrap"

function AddFileButton({ currentFolder }) {
  const [uploadingFiles, setUploadingFiles] = useState([])
  const { currentUser } = useAuth()
  function handleUpload(e) {
    const file = e.target.files[0]
    if (currentFolder == null || file == null) return

    const id = nanoid()
    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress: 0, error: false },
    ])

    const filePath =
      currentFolder.path.join("/") + currentFolder === ROOT_FOLDER
        ? "/"
        : `/${currentFolder.name}/` + file.name

    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: progress }
            }
            return uploadFile
          })
        })
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true }
            }
            return uploadFile
          })
        })
      },
      () => {
        setTimeout(() => {
          setUploadingFiles((prevUploadingFiles) => {
            return prevUploadingFiles.filter(
              (uploadFile) => uploadFile.id !== id
            )
          })
        }, 1000)
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          db.files.add({
            url,
            name: file.name,
            createdAt: db.getTimeStamp(),
            folderId: currentFolder.id,
            userId: currentUser.uid,
          })
        })
      }
    )
  }
  return (
    <>
      <label className="btn btn-outline-sucess btn-sm m-0 mr-2">
        <FaFileUpload />
        <input
          type="file"
          onChange={handleUpload}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        />
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px",
            }}
          >
            {uploadingFiles.map((file) => {
              return (
                <Toast
                  key={file.id}
                  onClose={() => {
                    setUploadingFiles((prevUploadingFiles) => {
                      return prevUploadingFiles.filter(
                        (uploadFile) => uploadFile.id !== file.id
                      )
                    })
                  }}
                >
                  <Toast.Header
                    closeButton={file.error}
                    className="text-truncate w-100 d-block"
                  >
                    {file.name}
                  </Toast.Header>
                  <Toast.Body>
                    {file.progress !== 1 ? (
                      <ProgressBar
                        animated={!file.error}
                        variant={file.error ? "danger" : "primary"}
                        now={file.error ? 100 : file.progress * 100}
                        label={
                          file.error
                            ? "Error"
                            : Math.round(file.progress * 100) + "%"
                        }
                      />
                    ) : (
                      <div className="d-block text-success ">
                        <FaCheckCircle /> File Uploaded
                      </div>
                    )}
                  </Toast.Body>
                </Toast>
              )
            })}
          </div>,
          document.body
        )}
    </>
  )
}

export default AddFileButton
