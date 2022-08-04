import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/github';

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    jwt: {
        encryption: true
    },
    secret: process.env.secret,
    callbacks: {
        async signIn({ token, account, profile }) {
            if (account?.accessToken) {
                token.accessToken = account.accessToken;
            }
            return token;
        },
        redirect: async (url, _baseUrl) => {
            return Promise.resolve('/');
        }
    }
});
