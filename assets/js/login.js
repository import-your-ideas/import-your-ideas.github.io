// FirebaseUI config.
var uiConfig = {
  autoUpgradeAnonymousUsers: true,
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInFlow: 'popup',
  signInSuccessUrl: '../profile',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    },
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: [
        'https://www.googleapis.com/auth/contacts.readonly'
      ],
      customParameters: {
        // Forces account selection even when one account
        // is available.
        prompt: 'select_account'
      }
    },
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends'
      ],
      customParameters: {
        // Forces password re-entry.
        auth_type: 'reauthenticate'
      }
    },
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: '<your-tos-url>',
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign('<your-privacy-policy-url>');
  },
  callbacks: {
    // signInFailure callback must be provided to handle merge conflicts which
    // occur when an existing credential is linked to an anonymous user.
    signInFailure: function(error) {
      // For merge conflicts, the error.code will be
      // 'firebaseui/anonymous-upgrade-merge-conflict'.
      if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
        return Promise.resolve();
      }
      // The credential the user tried to sign in with.
      var cred = error.credential;
      // Copy data from anonymous user to permanent user and delete anonymous
      // user.
      // ...
      console.log("AQUI SE DEBE DE COPIAR TODOS LOS DATOS")
      // Finish sign-in after data is copied.
      return firebase.auth().signInWithCredential(cred);
    },
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      console.log("LOGUEADO")
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    }
  }
};


// Temp variable to hold the anonymous user data if needed.
var data = null;
// Hold a reference to the anonymous current user.
var anonymousUser = firebase.auth().currentUser;

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

// Is there an email link sign-in?
if (ui.isPendingRedirect()) {
  ui.start('#firebaseui-auth-container', uiConfig);
}
// This can also be done via:
if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  ui.start('#firebaseui-auth-container', uiConfig);
}