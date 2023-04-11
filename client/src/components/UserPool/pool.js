import  { Amplify, Auth } from "aws-amplify"
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth"
import { CognitoUserPool } from "amazon-cognito-identity-js"
import { CognitoIdentityCredentials, Config } from "aws-sdk"
import awsExports from "../../aws-exports";

export const poolData = new CognitoUserPool({
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID
})

alert(process.env.REACT_APP_COGNITO_USER_POOL_ID)


Amplify.configure(awsExports)

export const facebookLogin = async () => {
  try {
    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Facebook
    })
  } catch (error) {
    console.log("error facebook signing up:", error)
  }
}

// google login using aws
export const googleLogin = async () => {
  try {
    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google
    })
  } catch (error) {
    console.log(error.message)
  }
}
