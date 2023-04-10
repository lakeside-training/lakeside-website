import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const config = {
    apiKey: "AIzaSyC9w5U6xUTs_EdgTh2vLtJb3fUQ4LTFMZQ",
    authDomain: "lakeside-notification.firebaseapp.com",
    projectId: "lakeside-notification",
    storageBucket: "lakeside-notification.appspot.com",
    messagingSenderId: "670150245794",
    appId: "1:670150245794:web:c200fb66865d38dee186fb"
}

const firebaseConfig = initializeApp(config);

export const messaging = getMessaging(firebaseConfig);


export const getTokens = () => {
    return getToken(messaging, { vapidKey: 'BMbdJj37uSOpMtdgmUCzfrzuIImaUubiYMawHuTHarmOpW7m24rLAyR53YHxDZMj3NnoeU9SBUK29SbQWnbCSrs' }).then((currentToken) => {
        if (currentToken) {
            return currentToken
        } else {
            return 'No registration token available. Request permission to generate one.'
        }
    }).catch((err) => {
        return err.message
    });
}

// export function requestPermission() {
//     Notification.requestPermission()
//         .then(async (permission) => {
//             if (permission === 'granted') {
//                 const token = await getTokens();
//                 console.warn(token)
//                 axios.post('/save-token', { token })
//                     .then(data => {
//                     })
//                     .catch(err => {
//                         toast.error("Please check your internet connection")
//                     })
//             } else {
//                 console.log('Do not have permission')
//             }
//         })
// }






