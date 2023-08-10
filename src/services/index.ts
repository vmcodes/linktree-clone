import axios from 'axios';
import { Message, Profile, Token } from '../types';
import emailjs from '@emailjs/browser';

const API_URL = `${import.meta.env.VITE_APP_API_URL}`;
const token = localStorage.getItem('x-social-blocks');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'content-Type': 'application/json',
    authorization: token ? `Bearer ${token}` : '',
  },
});

export const loginUser = async (address: string): Promise<Token> => {
  return (await api.post(`/login`, { address })).data;
};

export const getUser = async (address: string): Promise<Profile> => {
  return (await api.post(`/user`, { address: address })).data;
};

export const updateProfile = async (profile: Profile): Promise<boolean> => {
  return (await api.patch(`/user`, { ...profile })).data;
};

export const getProfile = async (slug: string): Promise<Profile> => {
  return (await api.get(`/user/${slug}`)).data;
};

const AWS_UPLOAD = `${import.meta.env.VITE_APP_AWS_UPLOAD}`;

const aws = axios.create({
  baseURL: 'https://v2.socialblocks.io',
});

export const addNewImage = async (slug: string, file: File) => {
  const config = {
    headers: {
      'x-api-key': AWS_UPLOAD,
      'Content-Type': `${file.type}`,
    },
  };

  return await aws.put(`/socialblocks/${slug}-${file.name}`, file, config);
};

export const contactForm = async (message: Message) => {
  const templateParams = {
    toEmail: message.toEmail,
    fromEmail: message.fromEmail,
    fromName: message.fromName,
    message: message.message,
  };

  return await emailjs.send(
    'service_ugh2vrg',
    'template_p80n672',
    templateParams,
    'B4mcNU2MfTyuG46F6',
  );
};
