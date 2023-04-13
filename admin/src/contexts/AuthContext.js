import React, { useEffect, useState } from "react";
import Spinner from "../components/spinner/Spinner"
import {Auth, Hub} from "aws-amplify";
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

    Hub.listen('auth', async (data) => {
      switch (data.payload.event) {
        case 'signIn':
          await fetchAuthUser()
          break;
        case 'signUp':
          console.log('user signed up');
          break;
        case 'signOut':
          console.log('user signed out');
          setUser(null)
          break;
        case 'signIn_failure':
          console.log('user sign in failed');
          break;
        case 'configured':
          console.log('the Auth module is configured');
          break;
        default:
          await fetchAuthUser()
      }
    });
  }, [])

  /**
   * log user in
   * @param email
   * @param password
   */
  const signIn = async ({ email, password }) => {

    return await Auth.signIn({ username: email, password })
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
