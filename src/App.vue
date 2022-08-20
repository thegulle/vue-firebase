<script setup>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
</script>

<template>
	<Header />
	<div class="container">
		<Transition>
			<router-view />
		</Transition>
	</div>
	<Footer />
</template>
