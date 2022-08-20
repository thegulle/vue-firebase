<script setup>
import { ref, onMounted } from "vue"
import { useTodoStore } from "@/stores/todoStore"

const todoStore = useTodoStore()
const listType = ref("completed")
onMounted(() => {
	todoStore.getTodoByCompleted(true)
	todoStore.getTodoByCompleted(false)
})
</script>

<template>
	<div class="tabs">
		<ul class="flex grid-cols gap-1">
			<li
				@click="listType = 'completed'"
				class="
					bg-indigo-500
					text-white
					p-2
					font-light
					text-center
					rounded-t-lg
					flex
					justify-center
					items-center
				"
				:class="listType === 'completed' ? 'border-b-2 border-white' : false"
			>
				<i class="ph-check-circle mr-1 text-xl"></i>
				Completed ({{ todoStore.completedList?.length }})
			</li>
			<li
				@click="listType = 'notCompleted'"
				class="
					bg-indigo-500
					text-white
					p-2
					font-light
					text-center
					rounded-t-lg
					flex
					justify-center
					items-center
				"
				:class="listType === 'notCompleted' ? 'border-b-2 border-white' : false"
			>
				<i class="ph-x-circle mr-1 text-xl"></i>
				No Completed ({{ todoStore.notCompletedList?.length }})
			</li>
		</ul>
	</div>
	<div class="panel-tabs" v-if="todoStore.loading === false">
		<div v-if="listType == 'completed'">
			<ul class="flex-row mt-5 h-60 overflow-auto pr-3">
				<li
					class="bg-gray-600 p-4 rounded-sm mb-2"
					v-for="todo in todoStore.completedList"
					:key="todo.id"
				>
					<h1 class="text-xl font-bold leading-none dark:text-white">
						{{ todo.subject }}
					</h1>
					<p
						class="text-sm text-gray-500 truncate dark:text-gray-400 font-light"
					>
						{{ todo.created_at?.slice(0, 13) }}
					</p>
					<p class="text-md mt-3 text-gray-200">
						{{ todo.content }}
					</p>
				</li>
			</ul>
		</div>
		<div v-if="listType == 'notCompleted'">
			<ul class="flex-row mt-5 h-60 overflow-auto pr-3">
				<li
					class="bg-gray-600 p-4 rounded-sm mb-2"
					v-for="todo in todoStore.notCompletedList"
					:key="todo.id"
				>
					<h1 class="text-xl font-bold leading-none dark:text-white">
						{{ todo.subject }}
					</h1>
					<p
						class="text-sm text-gray-500 truncate dark:text-gray-400 font-light"
					>
						{{ todo.created_at?.slice(0, 13) }}
					</p>
					<p class="text-md mt-3 text-gray-200">
						{{ todo.content }}
					</p>
				</li>
			</ul>
		</div>
	</div>
</template>