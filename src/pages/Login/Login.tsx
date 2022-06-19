import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";

import { useLinkedIn } from "react-linkedin-login-oauth2";
import { ReactComponent as Linkedin } from "../../assets/icons/linkedin.svg";
import { ReactComponent as Facebook } from "../../assets/icons/facebook.svg";

import Card from "../../ui/card/Card";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setIsAuthed } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/button/Button";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logIn = () => {
    dispatch(setIsAuthed(true));
    navigate("/");
  };
  const { linkedInLogin } = useLinkedIn({
    clientId: "78bls5mxywck1l",
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: (response) => {
      logIn();
      console.log(response);
    },
    scope: "r_emailaddress r_liteprofile",
  });

  const responseFacebook = () => {
    logIn();
  };

  return (
    <div className="login">
      <Card className="login__wrapper">
        <h2 className="login__title">Log in to your account</h2>
        <FacebookLogin
          appId="479981090596010"
          fields="name,email,picture"
          onSuccess={responseFacebook}
          render={(renderProps) => (
            <Button
              className="login__button facebook"
              onClick={renderProps.onClick}
            >
              <Facebook />
              Log in with Facebook
            </Button>
          )}
        />
        <Button onClick={linkedInLogin} className="login__button linkedin">
          <Linkedin />
          Log in with Linked In
        </Button>
      </Card>
    </div>
  );
};

export default Login;
