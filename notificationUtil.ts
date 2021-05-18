export default function notificationAlert(message : string) : void {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    }
  
    else if (Notification.permission === "granted") {
      let notification = new Notification(message);
    }
  
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          let notification = new Notification(message);
        }
      });
    }
  
  }