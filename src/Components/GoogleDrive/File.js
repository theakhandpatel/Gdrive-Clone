import React from "react"
import {} from "react-icons"
import { FaFile } from "react-icons/fa"

function File({ file }) {
  console.log(file)
  return (
    <a
      href={file.url}
      target="_blank"
      className="btn btn-outline-dark text-truncat w-100"
      rel="noreferrer"
    >
      <FaFile className="mr-2" /> {file.name}
    </a>
  )
}

export default File
