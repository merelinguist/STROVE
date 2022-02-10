import type { ActionFunction, MetaFunction } from "remix";
import { Form, Link } from "remix";

import { createUser, login } from "~/models/user.server";
import { getFormData } from "~/utils/getFormData";

const action: ActionFunction = async ({ request }) => {
  const { email, password } = await getFormData(request, [
    "email",
    "password",
  ] as const);

  const user = await createUser(email, password);

  return login(request, user.id);
};

const meta: MetaFunction = () => ({
  title: "Join",
});

function JoinPage() {
  return (
    <div className="prose mx-auto p-8">
      <h1>Join</h1>

      <Form method="post" className="space-y-6">
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
        <Link to="/login">Already have an account?</Link>
      </p>
    </div>
  );
}

export { action, meta };

export default JoinPage;
