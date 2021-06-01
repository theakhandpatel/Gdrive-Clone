import React, { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { FaFolderPlus } from "react-icons/fa"
import { useAuth } from "../../Contexts/AuthContext"
import { db } from "../../firebase"
import {ROOT_FOLDER} from "../../Hooks/useFolder"

export default function AddFolderButton({ currentFolder }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const { currentUser } = useAuth()
  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (currentFolder === null) {
      return
    }

    const path = [...currentFolder.path]

    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id })
    }

    db.folders.add({
      name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: db.getTimeStamp(),
    })
    setName("")
    closeModal()
  }

  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="sm">
        <FaFolderPlus />
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
