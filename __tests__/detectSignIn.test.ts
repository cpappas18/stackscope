import { detectSignIn } from '../lib/detectSignIn';

describe('detectSignIn', () => {
  describe('Auth0 detection', () => {
    it('should detect Auth0 from auth0.com', () => {
      const html = '<script src="https://cdn.auth0.com/js/auth0/9.0/auth0.min.js"></script>';
      expect(detectSignIn(html)).toContain('Auth0');
    });

    it('should detect Auth0 from auth0js keyword', () => {
      const html = '<script>const auth0js = new auth0.WebAuth({})</script>';
      expect(detectSignIn(html)).toContain('Auth0');
    });
  });

  describe('Firebase Auth detection', () => {
    it('should detect Firebase Auth from firebaseauth.googleapis.com', () => {
      const html = '<script src="https://www.firebaseauth.googleapis.com/js/identity.js"></script>';
      expect(detectSignIn(html)).toContain('Firebase Auth');
    });

    it('should detect Firebase Auth from firebase.auth', () => {
      const html = '<script>firebase.auth().signInWithEmailAndPassword()</script>';
      expect(detectSignIn(html)).toContain('Firebase Auth');
    });
  });

  describe('Clerk detection', () => {
    it('should detect Clerk from clerk keyword', () => {
      const html = '<script src="https://clerk.example.com/npm/@clerk/clerk-js@latest/dist/clerk.browser.js"></script>';
      expect(detectSignIn(html)).toContain('Clerk');
    });

    it('should detect Clerk from clerk.dev', () => {
      const html = '<script src="https://clerk.dev/script.js"></script>';
      expect(detectSignIn(html)).toContain('Clerk');
    });
  });

  describe('NextAuth.js detection', () => {
    it('should detect NextAuth.js from next-auth', () => {
      const html = '<script src="/api/auth/[...nextauth].js"></script>';
      expect(detectSignIn(html)).toContain('NextAuth.js');
    });

    it('should detect NextAuth.js from nextauth keyword', () => {
      const html = '<script>const nextauth = {}</script>';
      expect(detectSignIn(html)).toContain('NextAuth.js');
    });
  });

  describe('SuperTokens detection', () => {
    it('should detect SuperTokens from supertokens keyword', () => {
      const html = '<script src="/supertokens.js"></script>';
      expect(detectSignIn(html)).toContain('SuperTokens');
    });

    it('should detect SuperTokens from supertokens.com', () => {
      const html = '<script src="https://cdn.supertokens.com/supertokens.js"></script>';
      expect(detectSignIn(html)).toContain('SuperTokens');
    });
  });

  describe('Okta detection', () => {
    it('should detect Okta from okta.com', () => {
      const html = '<script src="https://ok1static.oktacdn.com/assets/js/sdk/okta-signin-widget.min.js"></script>';
      expect(detectSignIn(html)).toContain('Okta');
    });

    it('should detect Okta from okta- prefix', () => {
      const html = '<div id="okta-signin-container"></div>';
      expect(detectSignIn(html)).toContain('Okta');
    });
  });

  describe('OneLogin detection', () => {
    it('should detect OneLogin from onelogin keyword', () => {
      const html = '<script src="/onelogin.js"></script>';
      expect(detectSignIn(html)).toContain('OneLogin');
    });

    it('should detect OneLogin from onelogin.com', () => {
      const html = '<script src="https://secure.onelogin.com/js/onelogin.js"></script>';
      expect(detectSignIn(html)).toContain('OneLogin');
    });
  });

  describe('Passport.js detection', () => {
    it('should detect Passport.js from passport.js', () => {
      const html = '<script src="/passport.js"></script>';
      expect(detectSignIn(html)).toContain('Passport.js');
    });

    it('should detect Passport.js from passportjs keyword', () => {
      const html = '<script>passportjs.authenticate()</script>';
      expect(detectSignIn(html)).toContain('Passport.js');
    });
  });

  describe('AWS Cognito detection', () => {
    it('should detect AWS Cognito from amazon-cognito', () => {
      const html = '<script src="https://unpkg.com/amazon-cognito-identity-js/dist/amazon-cognito-identity.min.js"></script>';
      expect(detectSignIn(html)).toContain('AWS Cognito');
    });

    it('should detect AWS Cognito from cognito keyword', () => {
      const html = '<script>const cognito = new AmazonCognitoIdentity.CognitoUserPool()</script>';
      expect(detectSignIn(html)).toContain('AWS Cognito');
    });
  });

  describe('Azure AD detection', () => {
    it('should detect Azure AD from azuread keyword', () => {
      const html = '<script src="/azuread.js"></script>';
      expect(detectSignIn(html)).toContain('Azure AD');
    });

    it('should detect Azure AD from microsoftonline.com', () => {
      const html = '<script src="https://login.microsoftonline.com/common/oauth2/authorize"></script>';
      expect(detectSignIn(html)).toContain('Azure AD');
    });
  });

  describe('Google Sign-In detection', () => {
    it('should detect Google Sign-In from accounts.google.com/gsi', () => {
      const html = '<script src="https://accounts.google.com/gsi/client"></script>';
      expect(detectSignIn(html)).toContain('Google Sign-In');
    });

    it('should detect Google Sign-In from google.accounts.id', () => {
      const html = '<script>google.accounts.id.initialize({})</script>';
      expect(detectSignIn(html)).toContain('Google Sign-In');
    });

    it('should detect Google Sign-In from g_id_onload', () => {
      const html = '<script>function g_id_onload() {}</script>';
      expect(detectSignIn(html)).toContain('Google Sign-In');
    });

    it('should detect Google Sign-In from g_id_signin', () => {
      const html = '<div class="g_id_signin" data-type="standard"></div>';
      expect(detectSignIn(html)).toContain('Google Sign-In');
    });

    it('should detect Google Sign-In from google-signin-client_id', () => {
      const html = '<meta name="google-signin-client_id" content="123.apps.googleusercontent.com">';
      expect(detectSignIn(html)).toContain('Google Sign-In');
    });
  });

  describe('Facebook Login detection', () => {
    it('should detect Facebook Login from connect.facebook.net/en_US/sdk.js', () => {
      const html = '<script src="https://connect.facebook.net/en_US/sdk.js"></script>';
      expect(detectSignIn(html)).toContain('Facebook Login');
    });

    it('should detect Facebook Login from fb-login-button', () => {
      const html = '<div class="fb-login-button" data-scope="public_profile"></div>';
      expect(detectSignIn(html)).toContain('Facebook Login');
    });
  });

  describe('GitHub OAuth detection', () => {
    it('should detect GitHub OAuth from github.com/login with oauth', () => {
      const html = '<a href="https://github.com/login/oauth/authorize">Sign in with GitHub</a>';
      expect(detectSignIn(html)).toContain('GitHub OAuth');
    });

    it('should NOT detect GitHub OAuth without oauth keyword', () => {
      const html = '<a href="https://github.com/login">Sign in</a>';
      expect(detectSignIn(html)).not.toContain('GitHub OAuth');
    });
  });

  describe('Stytch detection', () => {
    it('should detect Stytch from stytch.com', () => {
      const html = '<script src="https://js.stytch.com/stytch.js"></script>';
      expect(detectSignIn(html)).toContain('Stytch');
    });

    it('should detect Stytch from stytch keyword', () => {
      const html = '<script>const stytch = Stytch.init()</script>';
      expect(detectSignIn(html)).toContain('Stytch');
    });
  });

  describe('Magic Link detection', () => {
    it('should detect Magic Link from magic.link', () => {
      const html = '<script src="https://cdn.magic.link/publishable/api-key"></script>';
      expect(detectSignIn(html)).toContain('Magic Link');
    });

    it('should detect Magic Link from magic-sdk', () => {
      const html = '<script src="/magic-sdk/dist/index.js"></script>';
      expect(detectSignIn(html)).toContain('Magic Link');
    });
  });

  describe('Supabase Auth detection', () => {
    it('should detect Supabase Auth from supabase.auth', () => {
      const html = '<script>supabase.auth.signInWithPassword()</script>';
      expect(detectSignIn(html)).toContain('Supabase Auth');
    });

    it('should detect Supabase Auth from supabase.com/auth', () => {
      const html = '<script src="https://supabase.com/auth.js"></script>';
      expect(detectSignIn(html)).toContain('Supabase Auth');
    });
  });

  describe('Userfront detection', () => {
    it('should detect Userfront from userfront keyword', () => {
      const html = '<script src="/userfront.js"></script>';
      expect(detectSignIn(html)).toContain('Userfront');
    });

    it('should detect Userfront from userfront.com', () => {
      const html = '<script src="https://api.userfront.com/v0/index.js"></script>';
      expect(detectSignIn(html)).toContain('Userfront');
    });
  });

  describe('Kinde detection', () => {
    it('should detect Kinde from kinde keyword', () => {
      const html = '<script src="/kinde.js"></script>';
      expect(detectSignIn(html)).toContain('Kinde');
    });

    it('should detect Kinde from kinde.com', () => {
      const html = '<script src="https://app.kinde.com/js/auth.js"></script>';
      expect(detectSignIn(html)).toContain('Kinde');
    });
  });

  describe('Multiple authentication detection', () => {
    it('should detect multiple authentication providers', () => {
      const html = `
        <script src="https://cdn.auth0.com/js/auth0.min.js"></script>
        <script>firebase.auth().signIn()</script>
        <div class="fb-login-button"></div>
      `;
      const result = detectSignIn(html);
      expect(result).toContain('Auth0');
      expect(result).toContain('Firebase Auth');
      expect(result).toContain('Facebook Login');
      expect(result.length).toBeGreaterThanOrEqual(3);
    });

    it('should detect OAuth providers together', () => {
      const html = `
        <script src="https://accounts.google.com/gsi/client"></script>
        <a href="https://github.com/login/oauth/authorize">GitHub</a>
        <div class="fb-login-button"></div>
      `;
      const result = detectSignIn(html);
      expect(result).toContain('Google Sign-In');
      expect(result).toContain('GitHub OAuth');
      expect(result).toContain('Facebook Login');
    });
  });

  describe('Edge cases', () => {
    it('should return empty array for empty string', () => {
      expect(detectSignIn('')).toEqual([]);
    });

    it('should return empty array for HTML with no auth indicators', () => {
      const html = '<html><body><h1>Hello World</h1></body></html>';
      expect(detectSignIn(html)).toEqual([]);
    });

    it('should be case sensitive (unlike other detections)', () => {
      const html = '<script>AUTH0.COM</script>';
      expect(detectSignIn(html.toLowerCase())).toContain('Auth0');
    });

    it('should handle partial matches correctly', () => {
      const html = '<script>window.auth0jsConfig = {}</script>';
      expect(detectSignIn(html)).toContain('Auth0');
    });

    it('should handle malformed HTML', () => {
      const html = '<div><script>firebase.auth()</script>broken';
      expect(detectSignIn(html)).toContain('Firebase Auth');
    });
  });

  describe('Real-world scenarios', () => {
    it('should detect typical Auth0 setup', () => {
      const html = `
        <script src="https://cdn.auth0.com/js/auth0/9.0/auth0.min.js"></script>
        <script>
          const auth0 = new auth0.WebAuth({
            domain: 'example.auth0.com',
            clientID: 'client_id'
          });
        </script>
      `;
      expect(detectSignIn(html)).toContain('Auth0');
    });

    it('should detect Firebase Auth setup', () => {
      const html = `
        <script src="https://www.gstatic.com/firebasejs/9.0/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/9.0/firebase-auth.js"></script>
        <script>
          firebase.auth().signInWithEmailAndPassword(email, password);
        </script>
      `;
      expect(detectSignIn(html)).toContain('Firebase Auth');
    });

    it('should detect NextAuth.js setup', () => {
      const html = `
        <script src="/api/auth/[...nextauth].js"></script>
        <script>
          import { signIn } from 'next-auth/react';
        </script>
      `;
      expect(detectSignIn(html)).toContain('NextAuth.js');
    });

    it('should detect social login providers', () => {
      const html = `
        <script src="https://accounts.google.com/gsi/client"></script>
        <script src="https://connect.facebook.net/en_US/sdk.js"></script>
        <a href="https://github.com/login/oauth/authorize">GitHub</a>
      `;
      const result = detectSignIn(html);
      expect(result).toContain('Google Sign-In');
      expect(result).toContain('Facebook Login');
      expect(result).toContain('GitHub OAuth');
    });
  });
});
