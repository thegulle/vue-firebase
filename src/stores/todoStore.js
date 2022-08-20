import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { ElMessage } from "element-plus"
import { getUserStorage } from "@/utils/storage";
import { Service, db } from "@/utils/apiService";
import { addDoc, collection, getDocs, getDoc, setDoc, doc, query, where, orderBy, limit } from "firebase/firestore";

export const useTodoStore = defineStore("todoStore", () => {
    const loading = ref(false);
    const user_uid = reactive(getUserStorage())
    const todoList = ref()
    const filterTodoList = ref()
    const completedList = ref()
    const notCompletedList = ref()
    const todo = ref({})
    const alert = ref('')
    const todoModalVisible = ref(false)
    const formData = ref({
        user_uid: getUserStorage(),
        subject: "",
        content: "",
        created_at: new Date().toUTCString(),
        completed: false
    })
    const editFormData = ref({
        id: -1,
        user_uid: getUserStorage(),
        subject: "",
        content: "",
        created_at: new Date().toUTCString(),
        completed: false
    })

    const addTodo = async () => {
        loading.value = true;
        await addDoc(collection(db, "todos"), formData.value).then(() => {
            getTodoList()
            getTodoByCompleted(true)
            getTodoByCompleted(false)
            formData.value.subject = ""
            formData.value.content = ""
            loading.value = false;
            ElMessage({
                showClose: true,
                message: "Congrats, this is a success message.",
                type: "success",
            })
        }
        ).catch(() => {
            formData.value.subject = ""
            formData.value.content = ""
            loading.value = false;
            ElMessage({
                showClose: true,
                message: "Todo is not added.",
                type: "error",
            })
        })
    }

    const updateTodo = async () => {
        await setDoc(doc(db, "todos", editFormData.value.id), editFormData.value).then(() => {
            getTodoList()
            getTodoByCompleted(true)
            getTodoByCompleted(false)
            ElMessage({
                showClose: true,
                message: "Congrats, this is a success message.",
                type: "success",
            })
            editFormData.value = {
                id: -1,
                user_uid: getUserStorage(),
                subject: "",
                content: "",
                created_at: new Date().toUTCString(),
                completed: false
            }
            todoModalVisible.value = false
        }
        ).catch(() => {
            ElMessage({
                showClose: true,
                message: "Todo not updated",
                type: "error",
            })
        })
    }

    const removeTodo = (todo) => {
        /* To do */
    }

    const getTodoList = async () => {
        loading.value = true;
        const user_uid = getUserStorage()
        const q = query(collection(db, "todos"), where("user_uid", "==", user_uid))
        await getDocs(q).then(res => {
            const data = res.docs.map(
                doc => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                }
            )
            todoList.value = data
        })
        loading.value = false;
    }

    const getTodoByCompleted = (completed) => {
        loading.value = true;
        completed = completed ? true : false
        const q = query(collection(db, "todos"), where("user_uid", "==", user_uid), where("completed", "==", completed), limit(20))

        new Promise(async (resolve, reject) => {
            await getDocs(q).then((res) => {
                const data = res.docs.map(
                    doc => {
                        return {
                            ...doc.data(),
                            id: doc.id
                        }
                    }
                )
                if (completed) {
                    completedList.value = data
                } else {
                    notCompletedList.value = data
                }
            }).catch((error) => {
                reject(error.message)
            })
            loading.value = false
        })
    }

    const getTodoById = async (id) => {
        const docRef = doc(db, "todos", id);
        const docSnap = await getDoc(docRef);
        editFormData.value = { id: id, ...docSnap.data() }
    }

    return {
        loading,
        todoList,
        filterTodoList,
        todo,
        alert,
        todoModalVisible,
        formData,
        editFormData,
        addTodo,
        updateTodo,
        removeTodo,
        getTodoList,
        getTodoById,
        getTodoByCompleted,
        completedList,
        notCompletedList
    }
});
