import type { ActionFunction, HeadersFunction, MetaFunction } from "remix";
import { Form, Link, redirect } from "remix";

import { login, verifyLogin } from "~/models/user.server";
import { getFormData } from "~/utils/getFormData";

const action: ActionFunction = async ({ request }) => {
  const { email, password } = await getFormData(request, [
    "email",
    "password",
  ] as const);

  const user = await verifyLogin(email, password);

  if (!user) {
    throw redirect("/login");
  }

  return login(request, user.id);
};

export let headers: HeadersFunction = () => {
  return {
    "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${
      60 * 60 * 24 * 30
    }`,
  };
};


const meta: MetaFunction = () => ({
  title: "Login",
});

function LoginPage() {
  return (
    <div className="prose mx-auto p-8">
      <h1>Sign in to your account</h1>

      <Form replace method="post" className="space-y-6">
        <label className="block">
          <span>Email address</span>
          <input
            className="block w-full"
                        name="email"

            type="email"
            autoComplete="email"
          />
        </label>

        <label className="block">
          <span>Password</span>
          <input
            className="block w-full"
            name="password"
            type="password"
            autoComplete="current-password"
          />
        </label>

        <button type="submit">Sign in</button>
      </Form>

      <p>
        <Link to="/join">Don’t have an account?</Link>
      </p>
    </div>
  );
}

export { action, meta };

export default LoginPage;
