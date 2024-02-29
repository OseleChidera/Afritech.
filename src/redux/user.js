import { createSlice } from "@reduxjs/toolkit";
const formEntries = {
    email: '',
    password: '',
    confirm_password: '',
    fullname: '',
    phone: '',
    address: '',
    bvnnumber: '',
    ninnumber: '',
    agreeToTerms: false,
    profilePicture: null,
    ninSlipPicture: null,
    dateOfBirth: "",
    reuploadNin: false,
    accountVerified: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userID: '',
        signupIndex: 0,
        signinIndex: 0,
        userData: null,
        animationCounter: 0,
        userFormEntries: formEntries,
        hasStorageAccessPermission: true,
        firebaseUserInfo: {},
        userFavourites: [],
        showModal: true,
        modalToshow: "",
        authCallbackUser: null,
        userFinancingData: [],
        data: {}
    },
    reducers: {
        setUserId: (state, action) => {
            state.userID = action.payload
        },
        removeUserId: (state, action) => {
            state.userID = action.payload
        },
        incrementSignup: (state, action = false) => {
            if (action.payload) {
                return;
            }
            state.signupIndex += 1
        },
        decrementSignup: state => {
            state.signupIndex -= 1
        },
        incrementAnimationCounter: (state, action = false) => {
            if (action.payload) {
                return;
            }
            state.animationCounter += 1
        },
        decrementAnimationCounter: state => {
            state.animationCounter -= 1
        },
        setSignupIndex: (state, action) => {
            state.signupIndex = action.payload
        },
        incrementSignin: (state, action = false) => {
            // console.log("action.payload" + " " + action.payload)
            if (action.payload) {
                return;
            }
            state.signinIndex += 1
        },
        decrementSignin: state => {
            state.signinIndex -= 1
        },
        incrementSigninToStartMultistep: (state) => {
            state.signinIndex = 1
        },
        incrementSigninByAmmount: (state, action) => {
            state.signinIndex = action.payload
        },
        updateUserFormEntries: (state, action) => {
            state.userFormEntries = action.payload
        },
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        removeUserData: (state, action) => {
            state.userData = action.payload
        },
        grantStorageAccess: (state, action) => {
            state.hasStorageAccessPermission = action.payload
        },
        setCurrentfirebaseUserInfo: (state, action) => {
            state.firebaseUserInfo = action.payload
        },
        showModalDispachFn: state => {
            state.showModal = true
        },
        hideModalDispachFn: state => {
            state.showModal = false
        },
        setModalToshow: (state, action) => {
            state.modalToshow = action.payload
        },
        setAuthCallbackUser: (state, action) => {
            state.authCallbackUser = action.payload
        },
        
        setuserFavouritesData: (state, action) => {
            state.userFavourites = action.payload
        },
        setData: (state, action) => {
            state.data = action.payload
        }
    }
})

export const {setUserId,removeUserId,incrementSignup,decrementSignup,incrementAnimationCounter,decrementAnimationCounter,setSignupIndex,incrementSignin,decrementSignin,incrementSigninToStartMultistep,incrementSigninByAmmount,updateUserFormEntries,setUserData,removeUserData ,grantStorageAccess,setCurrentfirebaseUserInfo,showModalDispachFn,hideModalDispachFn,setModalToshow,setAuthCallbackUser,setuserFavouritesData,setData } = userSlice.actions;

export default userSlice.reducer;



