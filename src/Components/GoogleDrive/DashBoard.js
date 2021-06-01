import React from "react"
import { Container } from "react-bootstrap"
import { useParams } from "react-router"
import { useFolder } from "../../Hooks/useFolder"
import AddFolderButton from "./AddFolderButton"
import FolderBreadCrumbs from "./FolderBreadCrumbs"
import Folder from "./Folder"
import NavBarComponent from "./NavBar"
import AddFileButton from "./AddFileButton"
import File from "./File"

function DashBoard() {
  const { folderId } = useParams()
  const { folder, childFolders, childFiles } = useFolder(folderId)

  return (
    <>
      <NavBarComponent />
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadCrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => {
              return (
                <div
                  key={childFolder.id}
                  className="p-2"
                  style={{ maxWidth: "250px" }}
                >
                  <Folder folder={childFolder} />
                </div>
              )
            })}
          </div>
        )}
        {childFolders[0] && childFiles[0] && <hr />}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map((childFiles) => {
              return (
                <div
                  key={childFiles.id}
                  className="p-2"
                  style={{ maxWidth: "250px" }}
                >
                  <File file={childFiles} />
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </>
  )
}

export default DashBoard
