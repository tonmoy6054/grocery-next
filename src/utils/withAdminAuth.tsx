/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correct default import

const withAdminAuth = (WrappedComponent: React.FC) => {
  const Wrapper: React.FC = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const decodedToken: any = jwtDecode(token); // Use jwtDecode as a function
        if (decodedToken.role !== "admin") {
          router.push("/");
        }
      } catch (error) {
        router.push("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAdminAuth;
