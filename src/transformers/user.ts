import type { GithubUser } from '@/services/github'
import type { User } from '@/views/HomeView.vue'
import shuffle from 'lodash.shuffle'

export function githubUserToAppUser(userList: GithubUser[]): User[] {
  return shuffle<User>(
    userList.map((user) => ({
      name: user.author.login,
      avatar: user.author.avatar_url,
      commits: user.total,
      id: user.author.id
    }))
  )
}
