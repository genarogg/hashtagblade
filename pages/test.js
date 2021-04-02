import { signIn, useSession, signOut } from "next-auth/client";

const Test = () => {
  const [session, loading] = useSession();
  console.log(session);
  return (
    <>
      <button type="button" onClick={() => signIn()}>
        Sign In
      </button>

      <button type="button" onClick={() => signOut()}>
        Sign Out
      </button>
    </>
  );
};

export default Test;
