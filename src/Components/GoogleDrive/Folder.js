import { Button } from "react-bootstrap"
import React from "react"
import { Link } from "react-router-dom"

function Folder({ folder }) {
  return (
    <>
      <Button
        as={Link}
        to={`/folder/${folder.id}`}
        variant="outline-dark"
        className="text-truncate w-100"
      >
        {folder.name}
      </Button>
    </>
  )
}

export default Folder
