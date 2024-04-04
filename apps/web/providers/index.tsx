// Imports
// ========================================================
import Wagmi from "./wagmi";
import Query from "./query";
import Rainbow from "./rainbow";

// Root Provider
// ========================================================
export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <Wagmi>
        <Query>
          <Rainbow>{children}</Rainbow>
        </Query>
      </Wagmi>
    </>
  );
}
