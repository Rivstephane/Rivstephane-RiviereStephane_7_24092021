<template>
	<main>
		<h1>SE CONNECTER</h1>
		<form>
			<label for="email">Email</label>
			<input type="email" name="email" class="email" placeholder="Tapez votre adresse Email" autofocus required v-model="email">
			<label for="password">Mot-de-passe</label>
			<input type="password" class="password" name="passeword" placeholder="Tapez votre mot de passe" required v-model="password">
        <button class="loginButton" type="submit" @click="userLogin">Connexion</button>
		</form>
	</main>
</template>

<script>
</script>