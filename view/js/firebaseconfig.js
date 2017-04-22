//INICIANDO FIREBASE
var config = {
    apiKey: "AIzaSyBYgZN5uCAlQzzg-BJnuB-gZJq0vT1Jg7U",
    authDomain: "trampaki-1f63e.firebaseapp.com",
    databaseURL: "https://trampaki-1f63e.firebaseio.com",
    storageBucket: "trampaki-1f63e.appspot.com",
    messagingSenderId: "4402696075"
};

firebase.initializeApp(config);

/*function getToken(){
    var db,request;
    request = indexedDB.open("fcm_token_details_db");
    request.onsuccess = function(e){
        db = request.result;
        var transaction = db.transaction(["fcm_token_object_Store"],"readonly");
        var store = transaction.objectStore("fcm_token_object_Store");
        var token = store.index('fcmToken');
        token.openCursor().onsuccess = function (e,tokenCallBack){
            self.token = e.target.result.key;
        }
    } 
}*/