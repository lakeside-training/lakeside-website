import Amplify, { Auth } from "aws-amplify"
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth"
import { CognitoUserPool } from "amazon-cognito-identity-js"
import { CognitoIdentityCredentials, Config } from "aws-sdk"

const poolData = new CognitoUserPool({
  UserPoolId: "ap-south-1_rSmTWsYuY",
  ClientId: "5h8576ibhd37l0vmk114ie7mdt"
})

export default poolData

Amplify.configure({
  Auth: {
    // (required) only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: "ap-south-1:ed8be940-c138-40be-bb88-e8f05820a6c6",

    // (required)- Amazon Cognito Region
    region: "ap-south-1",

    // (optional) - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: "ap-south-1",

    // (optional) - Amazon Cognito User Pool ID
    userPoolId: "ap-south-1_rSmTWsYuY",

    // (optional) - Amazon Cognito Web Client ID (26-char alphanumeric string, App client secret needs to be disabled)
    userPoolWebClientId: "5h8576ibhd37l0vmk114ie7mdt",

    oauth: {
      domain: "lakesidetutoria.auth.ap-south-1.amazoncognito.com",
      scope: [
        "email",
        "phone",
        "profile",
        "openid",
        "aws.cognito.signin.user.admin"
      ],
      redirectSignIn: "https://lakeside-client.vercel.app",
      //  "http://localhost:3000",
      redirectSignOut: "https://lakeside-client.vercel.app",
      //  "http://localhost:3000/login",
      responseType: "token" // or 'token', note that REFRESH token will only be generated when the
    }
  }
})

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
