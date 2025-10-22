import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTRJbOkgRyc1ftID3ABMYITkVlk3ioIPA",
  authDomain: "gari-ghor.firebaseapp.com",
  projectId: "gari-ghor",
  storageBucket: "gari-ghor.firebasestorage.app",
  messagingSenderId: "421288570973",
  appId: "1:421288570973:web:ea3017a51ba4108842ddb4"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;