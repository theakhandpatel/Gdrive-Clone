import React, { useState, useRef } from "react"

import { Form, Button, Alert, Card } from "react-bootstrap"
import { useAuth } from "../../Contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from "./CenteredContainer"

function UpdatePage() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { currentUser, updateEmail, updatePassword } = useAuth()
  const history = useHistory()

  const updateHandler = async (e) => {
    e.preventDefault()
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match")
    }

    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      try {
        await updateEmail(emailRef.current.value)
      } catch (error) {
        return setError(error.msg)
      }
    }
    if (passwordRef.current.value) {
      try {
        await updatePassword(passwordRef.current.value)
      } catch (error) {
        return setError(error.msg)
      }
    }
    history.push("/user")
  }

  return (
    <CenteredContainer>
      <div>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Update Details</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={updateHandler}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder={currentUser?.email}
                  type="email"
                  ref={emailRef}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={confirmPasswordRef} />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Update
              </Button>
              <Link to="/user">Abort</Link>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </CenteredContainer>
  )
}

export default UpdatePage
