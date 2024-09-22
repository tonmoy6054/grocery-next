// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "text",
//           placeholder: "Enter your email",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "Enter your password",
//         },
//       },
//       async authorize(credentials) {
//         const response = await fetch("http://localhost:3000/api/auth/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: credentials?.email,
//             password: credentials?.password,
//           }),
//         });

//         if (response.ok) {
//           const user = await response.json();
//           console.log("User data:", user);
//           if (user && user.id && user.email) {
//             return user;
//           }
//           console.error("User data is missing");
//           throw new Error("User data is missing");
//         } else {
//           const errorData = await response.json();
//           console.error("Authorization Error:", errorData.message);
//           throw new Error(errorData.message);
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//       }
//       console.log("JWT Token:", token);
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.email = token.email;
//       console.log("Session object:", session);
//       return session;
//     },
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60,
//   },
//   pages: {
//     signIn: "/login",
//   },
// });

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define a type for the user object
interface User {
  id: string;
  email: string;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        if (response.ok) {
          const user: User = await response.json();
          console.log("User data:", user);
          if (user && user.id && user.email) {
            return user;
          }
          console.error("User data is missing");
          throw new Error("User data is missing");
        } else {
          const errorData = await response.json();
          console.error("Authorization Error:", errorData.message);
          throw new Error(errorData.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as User).id;
        token.email = (user as User).email;
      }
      console.log("JWT Token:", token);
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      console.log("Session object:", session);
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
});
