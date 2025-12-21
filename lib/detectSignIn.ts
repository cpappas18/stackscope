export function detectSignIn(html: string) {
    const auth = [];

    if (html.includes("auth0.com") || html.includes("auth0js")) auth.push("Auth0");
    if (html.includes("firebaseauth.googleapis.com") || html.includes("firebase.auth")) auth.push("Firebase Auth");
    if (html.includes("clerk") || html.includes("clerk.dev")) auth.push("Clerk");
    if (html.includes("next-auth") || html.includes("nextauth")) auth.push("NextAuth.js");
    if (html.includes("supertokens") || html.includes("supertokens.com")) auth.push("SuperTokens");
    if (html.includes("okta.com") || html.includes("okta-")) auth.push("Okta");
    if (html.includes("onelogin") || html.includes("onelogin.com")) auth.push("OneLogin");
    if (html.includes("passport.js") || html.includes("passportjs")) auth.push("Passport.js");
    if (html.includes("amazon-cognito") || html.includes("cognito")) auth.push("AWS Cognito");
    if (html.includes("azuread") || html.includes("microsoftonline.com")) auth.push("Azure AD");
    if (
        html.includes("accounts.google.com/gsi") || 
        html.includes("google.accounts.id") ||
        html.includes("g_id_onload") ||
        html.includes("g_id_signin") ||
        html.includes("google-signin-client_id")
    ) auth.push("Google Sign-In");
    if (html.includes("connect.facebook.net/en_US/sdk.js") || html.includes("fb-login-button")) auth.push("Facebook Login");
    if (html.includes("github.com/login") && html.includes("oauth")) auth.push("GitHub OAuth");
    if (html.includes("stytch.com") || html.includes("stytch")) auth.push("Stytch");
    if (html.includes("magic.link") || html.includes("magic-sdk")) auth.push("Magic Link");
    if (html.includes("supabase.auth") || html.includes("supabase.com/auth")) auth.push("Supabase Auth");
    if (html.includes("userfront") || html.includes("userfront.com")) auth.push("Userfront");
    if (html.includes("kinde") || html.includes("kinde.com")) auth.push("Kinde");

    return auth;
}

