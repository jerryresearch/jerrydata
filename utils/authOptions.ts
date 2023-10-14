import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { verifyPassword } from "./verifyPassword";
import { connectToDB } from "./mongoose";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        await connectToDB();
        // Logic to look up the user from the credentials supplied
        const user = await User.find({ email: credentials.email });
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          const isValid = await verifyPassword(
            credentials.password,
            user[0].password
          );
          if (!isValid) {
            return null;
          }
          //   const isVerified = user[0].email_verified;
          //   if (!isVerified) {
          //     throw new Error("User is not verified.");
          //     return;
          //   }
          return {
            email: user[0].email,
            username: user[0].username,
            userId: user[0]._id,
          } as any;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    // async signIn(user, account, profile) {
    //   //
    //   // const existingUser = await User.findOne({ email: user.user.email });
    //   if (!existingUser) {
    //     //TODO Create a new user in your database
    //     try {
    //       //TODO create new user
    //     } catch (err) {
    //       console.log("Error message", err);
    //       return false;
    //     }
    //   }
    //   return true;
    // },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/user/login",
    error: "/user/login", //redirection page
  },

  secret: process.env.NEXT_PUBLIC_SECRET,
};
