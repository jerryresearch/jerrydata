import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "./mongoose";
import { verifyPassword } from "./verifyPassword";
import sgMail from "@sendgrid/mail";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  // adapter: MongoDBAdapter(clientPromise),
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
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        await connectToDB();
        // Logic to look up the user from the credentials supplied
        const user = await User.findOne({ email: credentials.email });
        if (user) {
          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );
          if (!isValid) {
            return null;
          }
          // Any object returned will be saved in `user` property of the JWT
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
          } as any;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  // callbacks: {
  // @ts-ignore
  // async signIn({ user, account, profile }) {
  //   console.log(user);
  //   console.log(account);
  //   console.log(profile);
  //   return {
  //     user,
  //     account,
  //     profile,
  //   };
  //   const existingUser = await User.findOne({ email: user.user.email });
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
  // session: ({ session, token }) => {
  //   return {
  //     ...session,
  //     user: {
  //       // @ts-ignore
  //       ...token.user,
  //     },
  //   };
  // },
  // jwt: ({ token, user }) => {
  //   if (user) {
  //     const u = user as unknown as any;
  //     return {
  //       ...token,
  //       user: { ...u, randomKey: u.randomKey },
  //     };
  //   }
  //   return token;
  // },
  // },
  callbacks: {
    // @ts-ignore
    async signIn(user, account, profile) {
      await connectToDB();
      const existingUser = await User.findOne({ email: user.user.email });
      if (!existingUser) {
        try {
          if (user.account.type == "credentials") {
            throw new Error("Not registered");
          }
          const newUser = await User.create({
            name: user.profile.given_name || user.profile.name,
            email: user.profile.email,
            image: user.profile.picture,
          });

          const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;
          const SENDGRID_FROM_ADDRESS = process.env.SENDGRID_FROM_ADDRESS;
          const SENDGRID_ONBOARDING_TEMPLATE_ID =
            process.env.SENDGRID_ONBOARDING_TEMPLATE_ID;

          sgMail.setApiKey(SENDGRID_API_KEY);
          const mailOptions = {
            to: user.profile.email,
            from: { name: "Jerrydata", email: SENDGRID_FROM_ADDRESS },
            templateId: SENDGRID_ONBOARDING_TEMPLATE_ID,
            dynamicTemplateData: {
              name: user.profile.given_name || user.profile.name,
            },
          };

          // @ts-ignore
          await sgMail.send(mailOptions);
        } catch (err) {
          console.log("Error", err);
          return false;
        }
      }
      return true;
    },
    // @ts-ignore
    session: async (session) => {
      await connectToDB();
      let userData = await User.findOne({
        email: session?.session?.user?.email,
      });
      userData = JSON.parse(JSON.stringify(userData));
      return {
        user: {
          id: userData._id,
          name: userData.name,
          email: userData.email,
          image: userData.image,
          generatingStories: userData.generatingStories,
        },
      };
    },
  },
  pages: {
    signIn: "/user/login",
    error: "/user/login", //redirection page
  },

  secret: process.env.NEXTAUTH_SECRET,
};
