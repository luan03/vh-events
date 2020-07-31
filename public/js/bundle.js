// custom map to iterate over NodeList object
NodeList.prototype._map = Array.prototype.map;

// open Event modal
document.querySelectorAll('[data-target]')._map( (button) => {

    button.addEventListener('click', () => {

        const modal = button.getAttribute("data-target")
        document.querySelector(`[data-modal="${modal}"]`).classList.remove('hide')
    });
})

// close modal events
document.querySelectorAll('.close')._map( (button) => {

    button.addEventListener('click', () => {
        document.querySelectorAll('.modal')._map( (modal) => {
            modal.classList.add('hide')
            modal.setAttribute('data-status','none')
         })
    });
})

// join event
document.querySelectorAll('[data-action]')._map( (button) => {

    button.addEventListener('click', () => {
        const modal = button.getAttribute("data-action")
        document.querySelector(`[data-modal="${modal}"]`).setAttribute('data-status','message')
    });
})

// apply event
document.querySelectorAll('[data-apply]')._map( (button) => {

    button.addEventListener('click', () => {

        if (button.getAttribute("data-apply") === "true") {
            if (button.textContent === "Applied") {
                return
            }

            disableJoinEvent()

            button.innerHTML = "Applied";
            document.querySelector('.toast.success').classList.remove('hide')
            hideToast()
        } else {

            document.querySelector('.toast.error').classList.remove('hide')
            hideToast()
        }
    });
})

// disable button Join Event
function disableJoinEvent() {
    alert('disable button Join Event')
}

// waiting list
document.querySelector('[data-list]').addEventListener('click', () => {
    document.querySelector('.info').classList.remove('hide')
    hideToast()
});

// hide toast
function hideToast() {

    const displayTime = 5000

    setTimeout(()=> {
        document.querySelectorAll('.toast')._map( (toast) => {
            toast.classList.add('hide')
        })
    }, displayTime)
}

// close toast