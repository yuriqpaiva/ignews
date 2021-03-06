import { query as q } from "faunadb";

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { fauna } from "../../../services/fauna";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          // Information that we need from Github user
          scope: "read:user",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      try {
        // Getting information about user (if has active subscription or not)
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index("subscription_by_user_ref"),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index("user_by_email"),
                      q.Casefold(session.user?.email!)
                    )
                  )
                )
              ),
              q.Match(q.Index("subscription_by_status"), "active"),
            ])
          )
        );

        return { ...session, activeSubscription: userActiveSubscription };
      } catch (err) {
        return { ...session, activeSubscription: null };
      }
    },
    async signIn({ user, account, profile }): Promise<boolean> {
      const { email } = user;

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index("user_by_email"), q.Casefold(user.email!))
              )
            ),
            q.Create(q.Collection("users"), { data: { email } }),
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(user.email!)))
          )
        );

        return true;
      } catch (error) {
        return false;
      }
    },
    async redirect(params: { url: string }) {
      const { url } = params

      // url is just a path, e.g.: /videos/pets
      if (!url.startsWith('http')) return url

      // If we have a callback use only its relative path
      const callbackUrl = new URL(url).searchParams.get('callbackUrl')
      if (!callbackUrl) return url

      return new URL(callbackUrl as string).pathname
    },
  },
});
