import api from "@/services/api.ts";

type RegisterProps = {
  name: string;
  email: string;
  password: string;
};

type LoginProps = {
  email: string;
  password: string;
};

export const register = (registerData: RegisterProps) => {
  return api.post("/users/register", registerData).then((res) => res.data);
};

export const login = (loginData: LoginProps) => {
  return api.post("/auth/login", loginData).then((res) => res.data);
};
