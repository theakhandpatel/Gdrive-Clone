import "./App.css"
import SignUp from "./Components/AuthComp/SignUp"
import PrivateRoute from "./Components/AuthComp/PrivateRoute"
import Login from "./Components/AuthComp/Login"
import { AuthProvider } from "./Contexts/AuthContext"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import UpdatePage from "./Components/AuthComp/UpdatePage"
import ForgotPassword from "./Components/AuthComp/ForgotPassword"
import Profile from "./Components/AuthComp/Profile"
import DashBoard from "./Components/GoogleDrive/DashBoard"
function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={DashBoard} />
          <PrivateRoute exact path="/folder/:folderId" component={DashBoard} />

          {/* User Profile */}
          <PrivateRoute exact path="/user" component={Profile} />
          <PrivateRoute path="/update" component={UpdatePage} />

          {/* Auth */}
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
