import * as _ from "../style";
import Logo from "../../../Assets/Svg/SignLogo.svg";
import OpenEyes from "../../../Assets/Svg/OpenEyes.svg";
import CloseEyes from "../../../Assets/Svg/CloseEyes.svg";
import { useCallback, useState } from "react";
import { useForm } from "../../../Hooks/useForm";
import { useSignIn } from "../../../Apis/Auth";
import { Link } from "react-router-dom";

export function SignIn() {
  const [inputTypeCheck, setInputTypeCheck] = useState(true);
  const { form: loginForm, handleChange } = useForm({
    email: "",
    password: "",
  });

  const { email, password } = loginForm;

  const { mutate: handleLogin } = useSignIn(loginForm);

  /** input type을 바꾸는 함수입니다. */
  const handleClickEye = useCallback(() => {
    setInputTypeCheck((prev) => !prev);
  }, []);

  return (
    <_.Container>
      <_.LogoImg src={Logo} alt="로고" />
      <_.BigTitle>로그인</_.BigTitle>
      <div>
        <_.SmallTitle>아이디</_.SmallTitle>
        <_.ContentInput
          onChange={handleChange}
          name="email"
          value={email}
          placeholder="이메일을 입력해주세요."
        />
      </div>
      <div>
        <_.SmallTitle>비밀번호</_.SmallTitle>
        <_.ContentInput
          onChange={handleChange}
          name="password"
          value={password}
          type={inputTypeCheck ? "password" : "text"}
          placeholder="비밀번호를 입력해주세요."
        />
        <_.EyeImg
          src={inputTypeCheck ? CloseEyes : OpenEyes}
          alt="보이는 거 바꾸는 버튼"
          onClick={handleClickEye}
        />
      </div>
      <_.SubmitBtn onClick={() => handleLogin()}>로그인</_.SubmitBtn>
      <Link to="/signUp">
        <_.SignUpText>회원가입 하러가기</_.SignUpText>
      </Link>
    </_.Container>
  );
}
