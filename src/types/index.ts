export interface Element {
  id?: number;
  index?: number;
  value?: string;
  title: string;
  element: string;
}

export interface Token {
  token: string;
}

export interface AuthState {
  error?: string;
  auth: boolean;
}

export interface Theme {
  color: string;
  algorithm: any;
  buttons: string;
}

export type Profile = {
  address: string;
  username: string;
  slug: string;
  image?: string;
  about?: string;
  location?: string;
  theme?: Theme;
  elements?: Element[];
};

export interface Message {
  toEmail: string;
  fromName: string;
  fromEmail: string;
  message: string;
}
