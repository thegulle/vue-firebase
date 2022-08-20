<script setup>
import { useTodoStore } from "@/stores/todoStore"
import TodoList from "@/components/Todos/index.vue"
import TodoForm from "@/components/Todos/TodoForm.vue"
const todoStore = useTodoStore()
</script>

<template>
	<TodoForm />
	<TodoList />
</template>