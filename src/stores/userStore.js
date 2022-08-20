import { ref } from "vue";
import { defineStore } from "pinia";
import {
    setToken, getToken, removeToken, setUserStorage,
    getUserStorage,
    removeUserStorage
} from '@/utils/storage';
import { computed } from 'vue'
import { Service } from "@/utils/apiService";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export const useUserStore = defineStore("userStore", () => {
    const token = ref(getToken())
    const auth = getAuth();
    const user = ref(getUserStorage());
    const alert = ref('');

    const isLoggedIn = computed(
        () => token.value !== undefined && token.value !== '' && token.value !== null && token.value !== 'undefined'
    )

    const setUser = (data) => {
        user.value = data;
        setToken(data.accessToken)
        setUserStorage(data.uid)
    }

    const handleLogin = async (user) => {
        await signInWithEmailAndPassword(auth, user.email, user.password)
            .then((res) => {
                setUser(res.user)
                location.reload()
            })
            .catch((error) => {
                const errorMessage = error.message
                alert.value = error.message
            });
    }

    const handleRegister = async (user) => {
        await createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((res) => {
                alert.value = 'User created successfully...'
                setTimeout(() => {
                    location.replace(import.meta.env.VITE_APP_HOST_URL)
                }, 2000);
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert.value = error.message
            });
    }

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                removeToken()
                removeUserStorage()
                location.replace(import.meta.env.VITE_APP_HOST_URL)
            })
            .catch((error) => {
                const errorMessage = error.message
                alert.value = errorMessage
            });
    }

    return {
        user,
        isLoggedIn,
        handleLogin,
        handleRegister,
        handleLogout,
        setUser,
        alert
    }
});