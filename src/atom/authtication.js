import {atom} from 'recoil';

export const isAuthenticatedUser = atom({
  key: 'isAuthenticatedUSer',
  default: false,
});

export const userInformation = atom({
  key: 'userInformation',
  default: {},
});

export const apiUrl = atom({
  key: 'apiUrl',
  default: 'https://api.moodstrap.store:5000/',
});
