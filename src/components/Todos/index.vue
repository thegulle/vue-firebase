<script setup>
import { onMounted } from "vue"
import { useTodoStore } from "@/stores/todoStore"

const todoStore = useTodoStore()

onMounted(() => {
	todoStore.getTodoList()
})
</script>

<template>
	<h1 class="text-5xl font-extralight tracking-wide mt-5 text-gray-800">
		Todos
	</h1>
	<Transition>
		<div
			class="
				flex
				grid grid-cols-1
				gap-2
				md:grid-cols-2
				lg:grid-cols-3
				mb-5
				w-full
				items-center
				justify-center
			"
			v-if="todoStore.loading === false"
		>
			<div
				v-for="todo in todoStore.todoList"
				:key="todo.id"
				class="
					p-4
					max-w-md
					bg-white
					rounded-lg
					border
					sm:p-8
					mt-3
					dark:bg-gray-800 dark:border-gray-700
					shadow-gray-400 shadow-lg
				"
			>
				<div class="flex justify-between items-center mb-4">
					<h5
						class="text-xl font-bold leading-none text-gray-900 dark:text-white"
					>
						{{ todo.subject }}

						<p
							class="
								text-sm text-gray-500
								truncate
								dark:text-gray-400
								font-light
							"
						>
							{{ todo.created_at?.slice(0, 13) }}
						</p>
					</h5>
					<div class="flex grid-cols gap-2 xs:grid-cols-1">
						<span
							class="
								text-sm
								font-medium
								text-white
								bg-indigo-500
								p-2
								rounded-lg
							"
						>
							{{ todo.completed ? "Completed" : "Not Completed" }}
						</span>
						<span
							@click="
								;(todoStore.todoModalVisible = true),
									todoStore.getTodoById(todo.id)
							"
							class="
								cursor-pointer
								text-sm
								font-medium
								text-white
								bg-indigo-500
								p-2
								rounded-lg
							"
						>
							<i class="ph-pencil"></i>
						</span>
					</div>
				</div>
				<div class="flow-root">
					<ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
						<li class="py-3 sm:py-4">
							<div class="flex items-center space-x-4">
								<div class="flex-1 min-w-0">
									<p class="text-md font-medium text-gray-900 dark:text-white">
										{{ todo.content }}
									</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</Transition>
</template>