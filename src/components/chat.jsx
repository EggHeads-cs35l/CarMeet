import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { user} from '../pages/login';

var firebaseConfig = {
    apiKey: "AIzaSyDiOR834TlZZosc2T6qBWUw9wy4WJzA7GQ",
    authDomain: "car-meet-f3d33.firebaseapp.com",
    databaseURL: "https://car-meet-f3d33-default-rtdb.firebaseio.com",
    projectId: "car-meet-f3d33",
    storageBucket: "car-meet-f3d33.appspot.com",
    messagingSenderId: "145464108137",
    appId: "1:145464108137:web:00cfb73a42e8fc2c35aef8",
    measurementId: "G-C6HLV06051"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.database();
  
  const username = user;

export default function Chat(props) {
  <div id="chat">
  <ul id="messages"></ul>
  <form id="message-form">
    <input id="message-input" type="text" />
    <button id="message-btn" type="submit" onClick={sendMessage(document.getElementById("message-input"))}>Send</button>
  </form>
</div>
  };

  function sendMessage(e) {
  
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  
    // clear the input box
    messageInput.value = "";
  
    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
      username,
      message,
    });
  }
  
  const fetchChat = db.ref("messages/");
  
  fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      user === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
  });
