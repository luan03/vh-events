
window.VH = {}

VH.Extensions = {
    map: function () {
        // custom map to iterate over NodeList object
        NodeList.prototype._map = Array.prototype.map;
    },

    init: function () {
        this.map()
    }
}

VH.toast = {

    close: function () {
        document.querySelectorAll('.toast')._map( (toast) => {

            toast.addEventListener('click', () => {
                toast.classList.add('hide')
            });
        })
    },

    hide: function () {
        const displayTime = 3000

        setTimeout(()=> {
            document.querySelectorAll('.toast')._map( (toast) => {
                toast.classList.add('hide')
            })
        }, displayTime)
    },

    error: function () {
        document.querySelector('.toast.error').classList.remove('hide')
        this.hide()
    },

    info: function () {
        document.querySelector('[data-list]').addEventListener('click', () => {
            document.querySelector('.toast.info').classList.remove('hide')
            this.hide()
        });
    },

    success: function () {
        document.querySelector('.toast.success').classList.remove('hide')
        this.hide()
    },

    init: function () {
        this.close()
        this.info()
    }
}

VH.modal = {
    open: function () {
        document.querySelectorAll('[data-target]')._map( (button) => {

            button.addEventListener('click', () => {

                const modal = button.getAttribute("data-target")
                document.querySelector(`[data-modal="${modal}"]`).classList.remove('hide')
            });
        })
    },
    close: function () {
        document.querySelectorAll('.close')._map( (button) => {

            button.addEventListener('click', () => {
                document.querySelectorAll('.modal')._map( (modal) => {
                    modal.classList.add('hide')
                    modal.setAttribute('data-status','none')
                 })
            });
        })
    },
    init: function () {
        this.open()
        this.close()
    }
}

VH.events = {
    join: function () {
        document.querySelectorAll('[data-action]')._map( (button) => {

            button.addEventListener('click', () => {
                const modal = button.getAttribute("data-action")
                document.querySelector(`[data-modal="${modal}"]`).setAttribute('data-status','message')
            });
        })
    },

    apply: function () {
        document.querySelectorAll('[data-apply]')._map( (button) => {

            button.addEventListener('click', () => {

                if (button.getAttribute("data-apply") === "true") {
                    if (button.textContent === "Applied") {
                        return
                    }

                    // disable button Join Event [CONTINUE]


                    // success
                    button.innerHTML = "Applied";
                    VH.toast.success()

                } else {
                    VH.toast.error()
                }
            });
        })
    },

    init: function () {
        this.join()
        this.apply()
    }
}

VH.navigation = {
    go: function () {
        document.querySelectorAll('menu a')._map( (link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault()

                let position = document.querySelector(link.getAttribute('href')).offsetTop
                window.scrollTo({ top: position, behavior: 'smooth' });
            })
        })
    },

    init: function () {
        this.go()
    }
}

VH.Extensions.init()

VH.modal.init()
VH.toast.init()
VH.events.init()
VH.navigation.init()