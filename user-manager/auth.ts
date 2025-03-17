import NextAuth from "next-auth"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [{
    id: "amason-provider", // signIn("my-provider") and will be part of the callback URL
    name: "Amason Provider", // optional, used on the default login page as the button text.
    type: "oidc", // or "oauth" for OAuth 2 providers
    issuer: "http://auth:8080", // to infer the .well-known/openid-configuration URL
    clientId: process.env.AUTH_CLIENT_ID, // from the provider's dashboard
    clientSecret: process.env.AUTH_CLIENT_SECRET, // from the provider's dashboard
    authorization: {params: {scope: "openid profile"}}, // additional authorization parameters
  }],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Se houver um novo accessToken, extraímos o sub do ID Token
      if (account && account.id_token) {
        const decoded = JSON.parse(Buffer.from(account.id_token.split(".")[1], "base64").toString());
        token.sub = decoded.sub; // Guarda o 'sub' do token
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.name = token.sub; // Passa o sub para o user.name
      }
      return session;
    },
  },
})