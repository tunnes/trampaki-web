importScripts("https://www.gstatic.com/firebasejs/3.7.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.7.2/firebase-messaging.js");

var config = {
    apiKey: "AIzaSyBYgZN5uCAlQzzg-BJnuB-gZJq0vT1Jg7U",
    authDomain: "trampaki-1f63e.firebaseapp.com",
    databaseURL: "https://trampaki-1f63e.firebaseio.com",        
    storageBucket: "trampaki-1f63e.appspot.com",
    messagingSenderId: "4402696075"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload){
    const title= payload.data.title;
    const options = {
        body: payload.data.status,
        icon: payload.data.icon,
        sound: payload.data.sound
    }
    return self.registration.showNotification(title, options);
});