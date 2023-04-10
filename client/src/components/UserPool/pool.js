import Amplify, { Auth } from "aws-amplify"
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth"
import { CognitoUserPool } from "amazon-cognito-identity-js"
import { CognitoIdentityCredentials, Config } from "aws-sdk"

export const poolData = new CognitoUserPool({
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID
})

alert(process.env.REACT_APP_COGNITO_USER_POOL_ID)


Amplify.configure({
  Auth: {
    // (required) only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,

    // (required)- Amazon Cognito Region
    region: process.env.REACT_APP_AWS_REGION,

    // (optional) - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: process.env.REACT_APP_AWS_REGION,

    // (optional) - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,

    // (optional) - Amazon Cognito Web Client ID (26-char alphanumeric string, App client secret needs to be disabled)
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,

    oauth: {
      domain: process.env.REACT_APP_COGNITO_DOMAIN,
      scope: [
        "email",
        "phone",
        "profile",
        "openid",
        "aws.cognito.signin.user.admin"
      ],
      redirectSignIn: process.env.REACT_APP_COGNITO_REDIRECT_SIGNIN,
      //  "http://localhost:3000",
      redirectSignOut: process.env.REACT_APP_COGNIT_REDIRECT_SIGNOUT,
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
