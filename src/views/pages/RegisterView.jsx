import RegisterForm from "../../components/Forms/RegisterForm";
import styled from "styled-components";
import logo from "../../public/static/images/logo.svg";

const View = styled.div`
  background-color: #252422;
  width: 100vw;
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
`;

const Logo = styled.img`
  width: 11rem;
  height: auto;
  margin-bottom: 2rem;
`;

export default function LoginView() {
  return (
    <View>
      <Logo src={logo} alt="logo" />
      <RegisterForm />
    </View>
  );
}
