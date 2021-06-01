import React, { useRef, useState } from "react"
import { Form, Button, Alert, Card } from "react-bootstrap"
import { useAuth } from "../../Contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from "./CenteredContainer"

function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const history = useHistory()

  async function loginHandler(e) {
    e.preventDefault()
    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      return setError("Please enter correct combination")
    }

    try {
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch (e) {
      setError(e.message)
      setLoading(false)
    }
  }

  return (
    <>
      <CenteredContainer>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={loginHandler}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Login
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          New here?<Link to="/signup">Create an account</Link>
        </div>
      </CenteredContainer>
    </>
  )
}

export default Login
