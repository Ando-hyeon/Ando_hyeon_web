import { useMutation } from "react-query";
import { instance } from "../axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { LoginDataType, SignUpDataType } from "./request";
import { AxiosError, AxiosResponse } from "axios";

const router = "/auth";

export const useSignIn = (loginData: LoginDataType) => {
  const navigator = useNavigate();
  const [, setCookies] = useCookies();

  return useMutation(async () => instance.post(`${router}/login`, loginData), {
    onSuccess: (res: AxiosResponse) => {
      const accessExpired = new Date(res.data.access_expires_at);
      setCookies("accessToken", res.data.accessToken, {
        expires: accessExpired,
      });
      setCookies("email", loginData.email);
      alert("로그인에 성공했습니다.");
      navigator("/");
    },
    onError: () => {
      alert("로그인에 실패했습니다.");
    },
  });
};

export const useSignUp = (signUpData: SignUpDataType) => {
  const navigator = useNavigate();
  return useMutation(
    async () => instance.post(`${router}/signup`, signUpData),
    {
      onSuccess: () => {
        alert("회원가입에 성공하였습니다.");
        navigator("/signIn");
      },
      onError: () => {
        alert("회원가입에 실패하였습니다.");
      },
    }
  );
};
