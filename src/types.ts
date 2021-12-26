export type Result = {
  id: number;
  name: string;
  url: string;
  isRepo: boolean;
}

export type Repository = {
  id: number;
  name: string;
  html_url: string;
}

export type User = {
  id: number;
  login: string;
  html_url: string;
}