<script setup>
import { ref } from "vue"
import { useTodoStore } from "@/stores/todoStore.js"
import todoForm from "@/utils/rules/todo-form.js"

const todoStore = useTodoStore()
const form = ref()

const handleUpdateTodo = () => {
	form.value.validate((valid) => {
		if (valid) {
			todoStore.updateTodo()
		} else {
			console.log("11")
		}
	})
}
const drawerWidth = ref(window.innerWidth <= 1024 ? 92 : 60)
</script>

<template>
	<el-dialog
		v-model="todoStore.todoModalVisible"
		title="Todo Edit"
		:width="drawerWidth + '%'"
	>
		<el-form
			:model="todoStore.editFormData"
			:rules="todoForm"
			ref="form"
			@submit="handleSubmitTodo"
			label-position="top"
		>
			<el-form-item label="Completion Status" prop="completion">
				<el-switch
					v-model="todoStore.editFormData.completed"
					size="large"
					active-text="Completed"
					inactive-text="Not Completed"
				/>
			</el-form-item>

			<el-form-item label="Subject" prop="subject">
				<el-input v-model="todoStore.editFormData.subject" />
			</el-form-item>
			<el-form-item
				label="Content"
				prop="content"
				:label-width="formLabelWidth"
			>
				<el-input
					type="textarea"
					v-model="todoStore.editFormData.content"
					rows="5"
				></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="todoStore.todoModalVisible = false"
					>Cancel</el-button
				>
				<el-button type="primary" @click="handleUpdateTodo">Confirm</el-button>
			</span>
		</template>
	</el-dialog>
</template>