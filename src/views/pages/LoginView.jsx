import LoginForm from "../../components/Forms/LoginForm";
import styled from "styled-components";
import logo from "../../public/static/images/logo.svg";

const View = styled.div`
  background-color: #252422;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Span = styled.span`
  margin-top: 8rem;
  color: #f7f7f7;
`;
const Link = styled.a`
  font-size: 1rem;
  color: #eb5e28;
  font-weight: 700;
  text-decoration: none;
  &:hover {
    transition: 0.5s;
    color: #cd6339;
  }
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
      <LoginForm></LoginForm>
      <Span>
        Não possui conta? <Link href="novo-cadastro">Registre-se</Link>
      </Span>
    </View>
  );
}
