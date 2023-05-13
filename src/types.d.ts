declare type Repository = {
  id: number;
  name: string;
  html_url: string;
}

declare type User = {
  id: number;
  login: string;
  html_url: string;
}

declare type GhUser = {
  login: string
  id: number
  avatar_url: string
  html_url: string
  repos_url: string
  name: string
  company: string
  location: string
  email: string
  hireable: boolean
  twitter_username: string
  public_repos: number
  followers: number
  following: number
  created_at: string
}
