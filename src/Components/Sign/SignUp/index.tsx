import * as _ from "../style";
import Logo from "../../../Assets/Svg/SignLogo.svg";
import OpenEyes from "../../../Assets/Svg/OpenEyes.svg";
import CloseEyes from "../../../Assets/Svg/CloseEyes.svg";
import { useCallback, useState } from "react";
import { useSignUp } from "../../../Apis/Auth";
import { useForm } from "../../../Hooks/useForm";
import { Link } from "react-router-dom";

export function SignUp() {
  const [inputTypeCheck, setInputTypeCheck] = useState(true);
  const { form: signUpForm, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = signUpForm;

  const { mutate: handleSignUp } = useSignUp(signUpForm);

  /** input type을 바꾸는 함수입니다. */
  const handleClickEye = useCallback(() => {
    setInputTypeCheck((prev) => !prev);
  }, []);

  return (
    <_.Container>
      <_.LogoImg src={Logo} alt="로고" />
      <_.BigTitle>회원가입</_.BigTitle>
      <div>
        <_.SmallTitle>이름</_.SmallTitle>
        <_.ContentInput
          onChange={handleChange}
          name="name"
          value={name}
          placeholder="이름을 입력해주세요."
        />
      </div>
      <div>
        <_.SmallTitle>아이디(이메일)</_.SmallTitle>
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
      <_.SubmitBtn onClick={() => handleSignUp()}>회원가입</_.SubmitBtn>
      <Link to="/signIn">
        <_.SignUpText>로그인 하러가기</_.SignUpText>
      </Link>
    </_.Container>
  );
}
