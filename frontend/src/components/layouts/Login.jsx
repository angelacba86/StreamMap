import "./Login.css";
import { Input, UiButton } from "../index";
export const Login = ({ openSignUp }) => {
  return (
    <>
      <form action="login" className="login">
        <label htmlFor="email">Email: </label>
        <Input type="email" placeholder="Coloca tu email" id="email" />
        <label htmlFor="password">Pasword: </label>
        <Input
          type="password"
          placeholder="Coloca tu contraseña"
          id="password"
        />
        <div className="checkbox">
          <input type="checkbox" id="savePassword" />{" "}
          <label htmlFor="savePassword">Recordarme</label>
        </div>
        <div className="button-content">
          <UiButton
            variant="primary"
            size="medium"
            style={{ width: "200px" }}
            disabled
          >
            Enviar
          </UiButton>
        </div>

        <hr />
        <small>
          ¿No estás inscrito?{" "}
          <button type="button" className="link-btn" onClick={openSignUp}>
            Inscribete aqui
          </button>
        </small>
      </form>
    </>
  );
};
