import "./SignUp.css";
import { Input, UiButton } from "../index";

export const SignUp = ({ openLogin }) => {
  return (
    <>
      <form className="signup">
        <label htmlFor="name">Nombre(s)</label>
        <Input type="text" placeholder="Coloca tu nombre aquí" id="name" />
        <label htmlFor="lastname">Apellido(s)</label>
        <Input
          type="text"
          placeholder="Coloca tu Apellido aquí"
          id="lastname"
        />
        <label htmlFor="email">Email</label>
        <Input type="email" placeholder="Coloca tu email aquí" id="email" />
        <label htmlFor="password">Contraseña</label>
        <Input
          type="password"
          placeholder="Coloca tu contraseña aquí"
          id="password"
        />
        <label htmlFor="password2">Repite la Contraseña</label>
        <Input
          type="password"
          placeholder="Repite tu contraseña aqui"
          id="password2"
        />
        <div className="button-content">
          <UiButton variant="primary" size="medium" disabled>
            Enviar
          </UiButton>
        </div>
        <hr />
        <small>
          ¿Ya tienes una cuenta?
          <button type="button" className="link-btn" onClick={openLogin}>
            Ingresa aqui
          </button>
        </small>
      </form>
    </>
  );
};
