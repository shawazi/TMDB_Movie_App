import { initializeApp } from "firebase/app";
import {toast} from 'react-toastify'; 
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider, 
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = getAuth(app);

// Register the user
export const register = async (email, password, displayName) => {

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName });
    toast.success('Account created successfully.');
    return false;
  } catch (err) {
     toast.error(err.message.replace("Firebase:", ""))
     return true; 
  }
};

// Login the user

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success('Logged in successfully.')
    return false;
  } catch (err) {
    toast.error(err.message.replace("Firebase:", ""))
    return true; 
  }
};

// signout a user

export const logout = () => {
  signOut(auth);
  toast.success('Logged out successfully.')
};

// sign in with google account

export const signUpProvider = async()=>{
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    toast.success('Logged in successfully.')
}

// forgetPassword

export const forgetPassword = async(email)=>{
    try{
        await sendPasswordResetEmail(auth, email);
        toast.success('A password reset email has been sent to your inbox.')
    }catch(err){
      toast.error(err.message.replace("Firebase:", "Did you forget to enter an email?"))
    }
}

// user observer

export const userObserver = (setCurrentUser)=>{
    onAuthStateChanged(auth, (user)=> {
        if(user) setCurrentUser(user)
        else setCurrentUser(null)
    })

}