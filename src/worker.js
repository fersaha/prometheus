console.log('entrando al service worker');

self.addEventListener('push', e=> {
    const data = e.data.json()
    console.log(data);
    self.registration.showNotification(data.title, {
        body : data.message,
        icon :'/img/logoSYEGPS.png'
    })
})