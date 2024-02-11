export type GithubUser = {
  total: number

  author: {
    login: string
    avatar_url: string
    id: number
  }
}

export class GithubService {
  static async listRepoContributors(repoName: string): Promise<GithubUser[] | null> {
    const res = await fetch(`https://api.github.com/repos/${repoName}/stats/contributors`)
    const stats: GithubUser[] = await res.json()
    return stats
  }
}
