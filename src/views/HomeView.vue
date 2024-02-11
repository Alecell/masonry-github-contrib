<script setup lang="ts">
import CardComponentVue from '@/components/CardComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import { ref } from 'vue'
import { useFetch } from '@/composables/useFetch'
import { GithubService } from '@/services/github'
import { githubUserToAppUser } from '@/transformers/user'

export type User = {
  name: string
  avatar: string
  commits: number
  id: number
}

let inputValue = ref('')
const { data, fetchData } = useFetch<User[]>(
  () => GithubService.listRepoContributors(inputValue.value),
  githubUserToAppUser,
  []
)

const handleUpdate = (newValue: string) => {
  inputValue.value = newValue
}

const getRepoInfo = (event: Event) => {
  event.preventDefault()
  fetchData()
}
</script>

<template>
  <main class="main">
    <h1 class="main__headline">Masonry Contributors</h1>
    <form class="main__form">
      <InputComponent @update="handleUpdate" />
      <button class="main__submit" type="submit" @click="getRepoInfo">BUSCAR</button>
    </form>

    <Suspense>
      <template #default>
        <div class="main__masonry">
          <CardComponentVue
            v-for="user in data"
            :key="user.id"
            :name="user.name"
            :commits="user.commits"
            :profile-url="user.avatar"
          />
        </div>
      </template>
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </main>
</template>

<style scoped>
.main {
  padding: 21px;
  margin: 0;
}

.main__headline {
  font-size: 34px;
  margin: 0 auto 21px;
  text-align: center;
}

.main__form {
  display: flex;
  justify-content: center;
  margin-bottom: 34px;
  gap: 21px;
}

.main__submit {
  border-radius: 200px;
  border: none;
  padding: 8px 13px;
  font-weight: bold;
  background-color: blue;
  color: white;
  transition: all 0.21s ease;
  cursor: pointer;
}

.main__submit:hover {
  transform: scale(1.09);
}
.main__masonry {
  column-count: auto;
  column-gap: var(--masonry-spacing);
  column-width: 210px;
}
</style>
@/composables/useFetch
