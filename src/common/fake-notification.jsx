export default function CRnotification() {
    setInterval(() => {
        window.dispatchEvent(
            new CustomEvent('fakeNotification', {
                detail: 'Notification'
            })
        ) 
    }, 10000)
}