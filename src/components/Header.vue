<script setup>
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()
</script>
<template>
	<nav class="bg-gray-800 py-2 md:py-4">
		<div class="container px-4 mx-auto flex items-center justify-between">
			<div class="flex justify-between items-center">
				<a href="#" class="font-extralight text-xl text-gray-300 flex">
					<img src="/logo.png" alt="logo" class="w-24 invert" />
					<super>Todo</super>
				</a>
			</div>

			<div
				class="flex-col md:flex-row md:ml-auto mt-3 md:mt-0"
				id="navbar-collapse"
			>
				<router-link
					v-if="userStore.isLoggedIn"
					:to="{ name: 'home' }"
					active-class="bg-indigo-500 text-white"
					class="
						p-2
						lg:px-4
						md:mx-2
						rounded
						transition-colors
						duration-300
						text-white
					"
					>Home
				</router-link>
				<router-link
					:to="{ name: 'sign-in' }"
					v-if="!userStore.isLoggedIn"
					active-class="bg-indigo-500 text-white"
					class="
						p-2
						text-white
						lg:px-4
						md:mx-2
						text-indigo-600 text-center
						border border-transparent
						rounded
						hover:bg-indigo-100 hover:text-indigo-700
						transition-colors
						duration-300
					"
					>Sign In
				</router-link>
				<router-link
					:to="{ name: 'sign-up' }"
					v-if="!userStore.isLoggedIn"
					active-class="bg-indigo-500 text-white"
					class="
						text-white
						p-2
						lg:px-4
						md:mx-2
						text-center
						border border-transparent
						rounded
						hover:bg-indigo-100 hover:text-indigo-700
						transition-colors
						duration-300
					"
					>Sign Up
				</router-link>
				<button
					@click="userStore.handleLogout"
					v-if="userStore.isLoggedIn"
					class="
						p-1
						lg:px-4
						mx-2
						text-pink-500 text-center
						border border-solid border-pink-500
						rounded
						hover:bg-pink-500 hover:text-white
						transition-colors
						duration-300
						mt-1
						md:mt-0 md:ml-1
					"
				>
					Log out
				</button>
			</div>
		</div>
	</nav>
</template>