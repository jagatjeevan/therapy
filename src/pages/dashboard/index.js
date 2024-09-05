import { useRouter } from "next/router";
import { useEffect } from "react";

import { withAuth } from "@/context/authContext";

function Dashboard(props) {
  const router = useRouter();
  const { state } = props.authContext;
  const { isLoggedIn } = props.authContext.state;

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/signin");
    }
  }, []);

  if (!state.isLoggedIn) {
    router.push("/signin");
  }

  return (
    <main>
      <h1>{state.user.email}</h1>
      Here goes the Dashboard content
    </main>
  );
}

export default withAuth(Dashboard);
