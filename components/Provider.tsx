import { SessionProvider, Session } from "next-auth/react";
import { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
  session: Session;
}

const Provider = ({ children, session }: ProviderProps): JSX.Element => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default Provider;
