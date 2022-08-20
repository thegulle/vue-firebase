<script setup>
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { getFirestore } from "@firebase/firestore"
import { useTodoStore } from "@/stores/todoStore"
import TodoInfo from "./TodoInfo.vue"
import TodoModal from "./TodoModal.vue"
import todoForm from "@/utils/rules/todo-form.js"

const form = ref()
const todoStore = useTodoStore()
const firestore = getFirestore()

const handleSubmitTodo = () => {
	form.value.validate((valid) => {
		if (valid) {
			todoStore.addTodo()
		}
	})
}
</script>

<template>
	<h1 class="text-5xl font-extralight tracking-wide mt-5 text-gray-800">
		Todo Form
	</h1>
	<div
		class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2 mt-5 todo-form"
	>
		<el-form
			@submit="e.preventDefault()"
			class="gap-5 bg-gray-800 p-8 rounded-lg shadow-gray-400 shadow-lg"
			:model="todoStore.formData"
			:rules="todoForm"
			ref="form"
			label-position="top"
		>
			<div class="mb-6">
				<el-form-item label="Todo Subject" prop="subject">
					<input
						v-model="todoStore.formData.subject"
						type="text"
						id="subject"
						class="
							bg-gray-50
							border border-gray-300
							text-white text-sm
							rounded-lg
							focus:ring-blue-500 focus:border-blue-500
							block
							w-full
							p-2.5
							dark:bg-gray-700
							dark:border-gray-600
							dark:placeholder-gray-400
							dark:text-white
							dark:focus:ring-blue-500
							dark:focus:border-blue-500
						"
						placeholder="Please enter the todo subject"
						required
					/>
				</el-form-item>
			</div>
			<div class="mb-6">
				<el-form-item label="Content" prop="content">
					<textarea
						v-model="todoStore.formData.content"
						id="content"
						maxlength="150"
						rows="5"
						class="
							bg-gray-50
							border border-gray-300
							text-white text-sm
							rounded-lg
							focus:ring-blue-500 focus:border-blue-500
							block
							w-full
							p-2.5
							dark:bg-gray-700
							dark:border-gray-600
							dark:placeholder-gray-400
							dark:text-white
							dark:focus:ring-blue-500
							dark:focus:border-blue-500
						"
						placeholder="Please enter the todo content"
						required
					/>
				</el-form-item>
			</div>
			<div class="mb-2 flex justify-end items-end">
				<el-button
					type="primary"
					class="bg-indigo-500"
					@click="handleSubmitTodo"
				>
					Add Todo
				</el-button>
			</div>
		</el-form>
		<div
			class="
				grid-flow-col
				gap-4
				bg-gray-800
				p-8
				rounded-lg
				shadow-gray-400 shadow-lg
			"
		>
			<TodoInfo />
		</div>
	</div>
	<TodoModal />
</template>

<style>
.todo-form .el-form-item__label {
	color: #fff !important;
}
</style>