import React from "react"
import { Breadcrumb } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ROOT_FOLDER } from "../../Hooks/useFolder"

function FolderBreadCrumbs({ currentFolder }) {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
  if (currentFolder) {
    path = [...path, ...currentFolder.path]
  }
  return (
    <Breadcrumb
      className="flex-grow-1"
      listProps={{ className: "bg-white m-0 pl-0" }}
    >
      {path.map((folder, index) => {
        return (
          <Breadcrumb.Item
            className="text-truncate d-inline-block"
            style={{ maxWidth: "150px" }}
            key={folder.id}
            linkAs={Link}
            linkProps={{
              to: folder.id ? `/folder/${folder.id}` : "/",
            }}
          >
            {folder.name}
          </Breadcrumb.Item>
        )
      })}
      {currentFolder && (
        <Breadcrumb.Item
          className="text-truncate d-inline-block"
          style={{ maxWidth: "200px" }}
          active
        >
          {currentFolder.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  )
}

export default FolderBreadCrumbs
