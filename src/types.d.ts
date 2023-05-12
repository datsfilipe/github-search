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

// declare scss modules for typescript
declare module '*module.scss' {
  const content: { [className: string]: string }
  export default content
}
