"use client";

import { apiFetcher } from "@/hooks/useRequest";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const LoginSchema = Yup.object().shape({
  login: Yup.string().min(2, "login muito curto").required("Campo obrigatório"),
  password: Yup.string()
    .min(2, "password muito curta")
    .required("Campo obrigatório"),
});

interface ILogin {
  login: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const submitLogin = async (values: ILogin) => {
    try {
      await apiFetcher("/auth", {
        method: "POST",
        body: values,
        credentials: true,
      });
      document.cookie = `isLoggedIn=true`;
      router.push("/admin");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-[500px] mx-auto">
      <Formik
        initialValues={{
          login: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={submitLogin}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <Label>Login</Label>
              <Field
                as={Input}
                type="text"
                name="login"
                variant="outlined"
                placeholder="Digite o seu login"
                fullWidth
                margin="normal"
                sx={{ textAlign: "left", margin: 0 }}
                error={errors.login}
              />
              {errors.login && touched.login ? (
                <Label variant="error">{`* ${errors.login}`}</Label>
              ) : null}
            </div>

            <div>
              <Label>Password</Label>
              <Field
                as={Input}
                name="password"
                type="password"
                variant="outlined"
                placeholder="Digite a sua senha"
                fullWidth
                margin="normal"
                sx={{ textAlign: "left", margin: 0 }}
                error={errors.password}
              />
              {errors.password && touched.password ? (
                <Label variant="error">{`* ${errors.password}`}</Label>
              ) : null}
            </div>

            <Button
              variant={"primary"}
              data-testid="submit"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
