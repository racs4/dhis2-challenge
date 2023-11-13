import { ReactNode } from "react";
import { Loading } from "../Loading";

type FetchComponentProps = {
  children: ReactNode;
  loading: boolean;
  error: boolean;
};

/**
 * A component that displays loading or error messages while data is being fetched.
 * If there are no errors and the data has been fetched successfully, it renders the children.
 * @param children The children to be rendered.
 * @param loading Whether the data is being fetched or not.
 * @param error Whether there was an error while fetching the data or not.
 * @returns A component that displays loading or error messages while data is being fetched.
 */
export const FetchComponent = ({
  children,
  loading,
  error,
}: FetchComponentProps) => {
  return (
    <div>
      {loading ? <Loading /> : error ? <h1>There was an error</h1> : children}
    </div>
  );
};
