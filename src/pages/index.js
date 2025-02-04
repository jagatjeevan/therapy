import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { withAuth } from "@/context/authContext";

const inter = Inter({ subsets: ["latin"] });

function Home(props) {
  const router = useRouter();
  const { isLoggedIn } = props.authContext.state;

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/signin");
    }
  }, []);

  return <main>Loading....</main>;
}

export default withAuth(Home);
