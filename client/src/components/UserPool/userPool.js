import  { Amplify, Auth } from "aws-amplify"
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth"
import { CognitoUserPool } from "amazon-cognito-identity-js"
import { CognitoIdentityCredentials, Config } from "aws-sdk"
import awsExports from "../../aws-exports";

const poolData = new CognitoUserPool({
  UserPoolId: "ap-south-1_rSmTWsYuY",
  ClientId: "5h8576ibhd37l0vmk114ie7mdt"
})

export default poolData

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
