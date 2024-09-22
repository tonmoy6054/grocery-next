import { useRouter } from "next/router";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

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
        const decodedToken: any = jwt_decode(token);
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
