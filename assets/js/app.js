initApp = function() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var uid = user.uid;
			var phoneNumber = user.phoneNumber;
			var providerData = user.providerData;
			user.getIdToken().then(function(accessToken) {
				document.getElementById('sign-in-status').textContent = 'Signed in';
				document.getElementById('sign-in').textContent = 'Sign out';
				document.getElementById('account-details').textContent = JSON.stringify({
					displayName: displayName,
					email: email,
					emailVerified: emailVerified,
					phoneNumber: phoneNumber,
					photoURL: photoURL,
					uid: uid,
					accessToken: accessToken,
					providerData: providerData
				}, null, '  ');
			});
		} else {
			// User is signed out.
			document.getElementById('sign-in-status').textContent = 'Signed out';
			document.getElementById('sign-in').textContent = 'Sign in';
			document.getElementById('account-details').textContent = 'null';
		}
	}, function(error) {
			console.log(error);
	});
};



function checkUserFullName(){
	var userSurname = document.getElementById("userFullName").value;
	var flag = false;
	if(userSurname === ""){
		flag = true;
	}
	if(flag){
		document.getElementById("userFullNameError").style.display = "block";
	}else{
		document.getElementById("userFullNameError").style.display = "none";
	}
}
// xxxxxxxxxx User Surname Validation xxxxxxxxxx
function checkUserSurname(){
	var userSurname = document.getElementById("userSurname").value;
	var flag = false;
	if(userSurname === ""){
		flag = true;
	}
	if(flag){
		document.getElementById("userSurnameError").style.display = "block";
	}else{
		document.getElementById("userSurnameError").style.display = "none";
	}
}
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkUserEmail(){
	var userEmail = document.getElementById("userEmail");
	var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var flag;
	if(userEmail.value.match(userEmailFormate)){
		flag = false;
	}else{
		flag = true;
	}
	if(flag){
		document.getElementById("userEmailError").style.display = "block";
	}else{
		document.getElementById("userEmailError").style.display = "none";
	}
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword(){
	var userPassword = document.getElementById("userPassword");
	var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
	var flag;
	if(userPassword.value.match(userPasswordFormate)){
		flag = false;
	}else{
		flag = true;
	}    
	if(flag){
		document.getElementById("userPasswordError").style.display = "block";
	}else{
		document.getElementById("userPasswordError").style.display = "none";
	}
}
// xxxxxxxxxx Check user bio characters. It'll use later xxxxxxxxxx
function checkUserBio(){
	var userBio = document.getElementById("userBio").value;
	var flag = false;
	if(flag){
		document.getElementById("userBioError").style.display = "block";
	}else{
		document.getElementById("userBioError").style.display = "none";
	}
}
// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp(){
	var userFullName = document.getElementById("userFullName").value;
	var userSurname = document.getElementById("userSurname").value;
	var userEmail = document.getElementById("userEmail").value;
	var userPassword = document.getElementById("userPassword").value;
	var userFullNameFormate = /^([A-Za-z.\s_-])/;    
	var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

	var checkUserFullNameValid = userFullName.match(userFullNameFormate);
	var checkUserEmailValid = userEmail.match(userEmailFormate);
	var checkUserPasswordValid = userPassword.match(userPasswordFormate);

	if(checkUserFullNameValid == null){
		return checkUserFullName();
	}
	else if(userSurname === ""){
		return checkUserSurname();
	}
	else if(checkUserEmailValid == null){
		return checkUserEmail();
	}
	else if(checkUserPasswordValid == null){
		return checkUserPassword();
	}
	else{
		firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
			var user = firebase.auth().currentUser;
			var uid;
			if (user != null) {
				uid = user.uid;
			}
			var firebaseRef = firebase.database().ref('users');
			var userData = {
				userFullName: userFullName,
				userSurname: userSurname,
				userEmail: userEmail,
				userPassword: userPassword,
				userFb: "https://www.facebook.com/",
				userTw: "https://twitter.com/",
				userBio: "User biography",
			}
			firebaseRef.child(uid).set(userData);
			swal.fire({
				type:'successfully',
				title:'Your Account Created',
				text:'Your account was created successfully, you can log in now.'
			}).then((value) => {
				setTimeout(function(){
					window.location.replace("../index.html");
				}, 1000)
			});
		}).catch((error) => {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			swal.fire({
				type: 'error',
				title: 'Error',
				text: "Error",
			})
		});
	}
}
// xxxxxxxxxx Working For Sign In Form xxxxxxxxxx
// xxxxxxxxxx Sign In Email Validation xxxxxxxxxx
function checkUserSIEmail(){
	var userSIEmail = document.getElementById("userSIEmail");
	var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var flag;
	if(userSIEmail.value.match(userSIEmailFormate)){
		flag = false;
	}else{
		flag = true;
	}
	if(flag){
		document.getElementById("userSIEmailError").style.display = "block";
	}else{
		document.getElementById("userSIEmailError").style.display = "none";
	}
}
// xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
function checkUserSIPassword(){
	var userSIPassword = document.getElementById("userSIPassword");
	var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
	var flag;
	if(userSIPassword.value.match(userSIPasswordFormate)){
		flag = false;
	}else{
		flag = true;
	}    
	if(flag){
		document.getElementById("userSIPasswordError").style.display = "block";
	}else{
		document.getElementById("userSIPasswordError").style.display = "none";
	}
}
// xxxxxxxxxx Check email or password exsist in firebase authentication xxxxxxxxxx    
function signIn(){
	var userSIEmail = document.getElementById("userSIEmail").value;
	var userSIPassword = document.getElementById("userSIPassword").value;
	var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

	var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
	var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

	if(checkUserEmailValid == null){
		return checkUserSIEmail();
	}else if(checkUserPasswordValid == null){
		return checkUserSIPassword();
	}else{
		firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
			swal.fire({
				type: 'successfull',
				title: 'Succesfully signed in', 
			}).then((value) => {
				setTimeout(function(){
					window.location.replace("./pages/profile.html");
				}, 1000)
			});
		}).catch((error) => {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			swal.fire({
				type: 'error',
				title: 'Error',
				text: "Error",
			})
		});
	}
}
// xxxxxxxxxx Working For Profile Page xxxxxxxxxx
// xxxxxxxxxx Get data from server and show in the page xxxxxxxxxx
firebase.auth().onAuthStateChanged((user)=>{
	if (user) {
	//   User is signed in.
		let user = firebase.auth().currentUser;
		let uid
		if(user != null){
			uid = user.uid;
		}
		let firebaseRefKey = firebase.database().ref('users').child(uid);
		// TODO: Que compruebe si existe el usuario, si no que cree uno con la sesion actual
		firebaseRefKey.on('value', function(dataSnapShot) {
			document.getElementById("userPfFullName").innerHTML = dataSnapShot.val().userFullName;
			document.getElementById("userPfSurname").innerHTML = dataSnapShot.val().userSurname;
			document.getElementById("userPfEmail").innerHTML = dataSnapShot.val().userEmail;
			// userEmail = dataSnapShot.val().userEmail;
			// userPassword = dataSnapShot.val().userPassword;
			document.getElementById("userPfFb").setAttribute('href', dataSnapShot.val().userFb);
			document.getElementById("userPfTw").setAttribute('href', dataSnapShot.val().userTw);
			document.getElementById("userPfBio").innerHTML = dataSnapShot.val().userBio;
		});
	} else {
	//   No user is signed in.
	}
});
// xxxxxxxxxx Show edit profile form with detail xxxxxxxxxx
function showEditProfileForm(){
	document.getElementById("profileSection").style.display = "none"
	document.getElementById("editProfileForm").style.display = "block"
	var userPfFullName = document.getElementById("userPfFullName").innerHTML;
	var userPfSurname = document.getElementById("userPfSurname").innerHTML;
	var userPfEmail = document.getElementById("userPfEmail").innerHTML;
	var userPfFb = document.getElementById("userPfFb").getAttribute("href");
	var userPfTw = document.getElementById("userPfTw").getAttribute("href");
	var userPfBio = document.getElementById("userPfBio").innerHTML;
	document.getElementById("userFullName").value = userPfFullName; 
	document.getElementById("userSurname").value = userPfSurname; 
	document.getElementById("userEmail").value = userPfEmail;
	document.getElementById("userFacebook").value = userPfFb; 
	document.getElementById("userTwitter").value = userPfTw;
	document.getElementById("userBio").value = userPfBio; 
}
// xxxxxxxxxx Hide edit profile form xxxxxxxxxx
function hideEditProfileForm(){
	document.getElementById("profileSection").style.display = "block";
	document.getElementById("editProfileForm").style.display = "none";
}
// xxxxxxxxxx Save profile and update database xxxxxxxxxx
function saveProfile(){
	let userFullName = document.getElementById("userFullName").value 
	let userSurname = document.getElementById("userSurname").value
	let userEmail = document.getElementById("userEmail").value 
	let userFacebook = document.getElementById("userFacebook").value 
	let userTwitter = document.getElementById("userTwitter").value 
	let userBio = document.getElementById("userBio").value
	var userFullNameFormate = /^([A-Za-z.\s_-])/; 
	var checkUserFullNameValid = userFullName.match(userFullNameFormate);
	if(checkUserFullNameValid == null){
		return checkUserFullName();
	} else if(userSurname === "") {
		return checkUserSurname();
	} else {
		let user = firebase.auth().currentUser;
		let uid;
		if(user != null){
			uid = user.uid;
		}
		var firebaseRef = firebase.database().ref();
		var userData = {
			userFullName: userFullName,
			userSurname: userSurname,
			userEmail: userEmail,
			userFb: userFacebook,
			userTw: userTwitter,
			userBio: userBio,
		}

		// Write the new post's data simultaneously in the posts list and the user's post list.
		var updates = {};
		updates['/users/' + uid] = userData;

		firebase.database().ref().update(updates, function(error) {
			if(error) {
				//TODO: Checkear el error y mostrar enlace a logueo si no esta logueado
				swal.fire({
					type: 'error',
					title: 'Error on Update or Create',
					text: new String(error).valueOf()
				});
			} else {
				// Se actualiza la sesion de usuario
				user.updateProfile({
				  displayName: userFullName,
				  photoURL: null
				}).then(function() {
				  // Update successful. Ahora se actualiza el email
				  user.updateEmail("user@example.com").then(function() {
						// Update successful. Se ha terminado de actualizar
						swal.fire({
							type: 'successfull',
							title: 'Update successfull',
							text: 'Profile updated.', 
						}).then((value) => {
							setTimeout(function(){
								document.getElementById("profileSection").style.display = "block";
								document.getElementById("editProfileForm").style.display = "none";
							}, 1000)
						});
					}).catch(function(error) {
					  // An error happened.
					  swal.fire({
							type: 'error',
							title: 'Error on Update Email',
							text: new String(error).valueOf()
						});
					});
				}).catch(function(error) {
				  // An error happened.
				  swal.fire({
						type: 'error',
						title: 'Error on Update Profile',
						text: new String(error).valueOf()
					});
				});
			}
		});
	}
}

signOut = function(){
	firebase.auth().signOut().then(function() {
		// Sign-out successful.
		swal.fire({
			type: 'successfull',
			title: 'Signed Out', 
		}).then((value) => {
			setTimeout(function(){
				window.location.replace("../index.html");
			}, 1000)
		});
		}).catch(function(error) {
			// An error happened.
			let errorMessage = error.message;
			swal.fire({
				type: 'error',
				title: 'Error',
				text: "Error",
			})
	});
};


window.addEventListener('load', function() {
	initApp();
});