interface ISignInUser {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export {ISignInUser};
