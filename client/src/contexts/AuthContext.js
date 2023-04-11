import React, { useEffect, useState } from "react";
import {Auth, Hub} from "aws-amplify";
import Spinner from "../components/spinner/Spinner"
// Create a context object
export const AuthContext = React.createContext({
  user: null,
  isAuthenticated: false,
  isAuthenticating: true,
  unverifiedAccount: {
    email: "",
    password: ""
  },
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
  confirmAccount: async () => {}
})

// Create a provider for components to consume and subscribe to changes
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [unverifiedAccount, setUnverifiedAccount] = useState({
    email: "",
    password: ""
  })

  /**
   * fetch currently logged-in user using AWS Auth library
   * @returns {Promise<void>}
   */
  const fetchAuthUser = async () => {
    try {
      const fetchedUser = await Auth.currentAuthenticatedUser()
      console.log('Fetched User: ',fetchedUser)
      setIsAuthenticating(false)
      setUser(fetchedUser)
    } catch (err) {
      setIsAuthenticating(false)
      setUser(null)
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAuthUser()

    // listening for auth change events
    const authListener = Hub.listen(
      "auth",
      async ({ payload: { event, data } }) => {
        console.log("Auth Status Changed Event: ", event)
        console.log("Auth Status Changed Data: ", data)
        switch (event) {
          case 'configured':
            console.info('the Auth module is configured');
            break
          case "signIn":
            console.info('Signed In, Fetching user')
            await fetchAuthUser()
            break
          case "signOut":
            setUser(null)
            break
          case "signIn_failure":
            alert("Sign in Failed")
          case "signUp_failure":
            if (user) {
              setUser(null)
            }
            break
          case "signUp":
          case "forgotPassword":
          case "forgotPasswordSubmit":
          case "forgotPasswordSubmit_failure":
          case "forgotPassword_failure":
            break
          default:
            await fetchAuthUser()
        }
      }
    )

    // cleanup
    return () => {
      authListener()
    }
  }, [])

  /**
   * log user in
   * @param email
   * @param password
   */
  const signIn = async ({ email, password }) => {
    await Auth.signIn({ username: email, password })
  }

  /**
   * create new user account
   * @param email
   * @param password
   * @param firstName
   * @param lastName
   */
  const signUp = async ({ email, password, firstName, lastName }) => {
    await Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        name: `${firstName} ${lastName}`
      }
    })
    setUnverifiedAccount({ email, password })
  }

  /**
   * confirm account using code
   * @param confirmCode
   * @returns {Promise<any>}
   */
  const confirmAccount = async ({ code }) => {
    await Auth.confirmSignUp(unverifiedAccount?.email, code)
    await signIn({
      email: unverifiedAccount?.email,
      password: unverifiedAccount?.password
    })
  }

  /**
   * logout user
   */
  const signOut = async () => Auth.signOut()

  const value = {
    user,
    isAuthenticated: !!user,
    isAuthenticating,
    unverifiedAccount,
    signIn,
    signOut,
    signUp,
    confirmAccount
  }

  if (isAuthenticating) {
    return <Spinner />
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
