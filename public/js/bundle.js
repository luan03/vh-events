/**
 * Module namespace
 */
window.VH = {}

/**
 * Server-side response mockup
 */
VH.modals = {
    "event-667": {
        id: "event-667",
        status: "none",
        title: "Sāo Paulo Big Data Meetup",
        date: "August 1st & August 2nd 2020",
        content: "This is a group for everyone interested in Big Data and related technologies. This is an informal environment for the exchange of ideas and networking.",
        tags: ["NoSQL", "Hadoop", "Linked Data", "Natural Language Processing"],
        cta: "Join this event",
        disabled: "",
        premium: false
    },
    "event-668": {
        id: "event-668",
        status: "none",
        title: "Saint Petersburg JS Meetup",
        date: "August 1st & August 2nd 2020",
        content: "Our mission is to provide a community and a voice for Saint Petersburg's JavaScript technology community. We aim to further everyone's knowledge and explore all aspects of technology for all skill and interest levels.",
        tags: ["javascript", "react", "node", "vue"],
        cta: "Join this event",
        disabled: "",
        premium: false
    },
    "event-669": {
        id: "event-669",
        status: "none",
        title: "Shanghai CSS Meetup",
        date: "August 1st & August 2nd 2020",
        content: "Events cater to all skill levels, with talks aimed at those yet to experience the joy of writing elegant, expressive CSS, through to experts looking to find like-minded folk to discuss ideas with.",
        tags: ["css", "flexbox", "bootstrap", "animation", "grid"],
        cta: "Join this event",
        disabled: "disabled",
        premium: false
    },
    "event-670": {
        id: "event-670",
        status: "none",
        title: "VanHack Leap",
        date: "August 1st & August 2nd 2020",
        content: "VanHack Leap is an in-person event held across cities in Canada and Europe where companies looking to hire senior tech talent can meet 30-50 top developers – who’ve flown in from all over the world – interview them, and hire them!",
        tags: ["leap", "canada", "job", "tech", "developer"],
        cta: "Join this event",
        disabled: "",
        premium: false
    },
    "event-671": {
        id: "event-671",
        status: "none",
        title: "Recruiting Mission",
        date: "August 1st & August 2nd 2020",
        content: "2019 has been a great year for VanHack events, but 2020 will be HUGE! We are having more editions of Leap and more editions of the Recruiting Mission in different cities and countries.",
        tags: ["Brazil", "recruiting", "job", "tech", "developer"],
        cta: "Join this event",
        disabled: "",
        premium: false
    },
    "event-672": {
        id: "event-672",
        status: "none",
        title: "VanHackathon",
        date: "August 1st & August 2nd 2020",
        content: "The VanHackathon is for developers and designers who want to get hired abroad. We’ll also have 3-5 companies from Canada and Europe who are looking for great tech talent to add to their teams.",
        tags: ["hackathon", "recruiting", "job", "tech", "developer"],
        cta: "Join this event",
        disabled: "",
        premium: false
    },
    "event-673": {
        id: "event-673",
        status: "none",
        title: "How to get a Remote Job",
        date: "August 1st & August 2nd 2020",
        content: "VanHack helps you quickly find Senior Tech Professionals from our global community of over 130000 candidates who are ready to relocate or work remotely.",
        tags: ["Job", "recruiting", "Canada", "tech", "developer"],
        cta: "Join this event",
        disabled: "",
        premium: true
    },
    "event-674": {
        id: "event-674",
        status: "none",
        title: "Learn how to hire and scale",
        date: "August 1st & August 2nd 2020",
        content: "Tech companies are looking to hire and scale diverse teams. Facebook aims to double the number of women on its global workforce.",
        tags: ["hackathon", "recruiting", "job", "tech", "developer", "team", "diversity"],
        cta: "Join this event",
        disabled: "",
        premium: false
    },
}

/**
 * Message status
 */
VH.modals.status = {
    error: {
        value: "error",
        title: "Something went wrong!",
        content: "Your confirmation could not be done yet",
        icon: "fa-times-circle"
    },
    success: {
        value: "success",
        title: "Everything went well!",
        content: "Your confirmation was done with success. See you soon",
        icon: "fa-check-circle"
    }
}

/**
 * Modal module
 */
VH.modal = {
    alert: function (status) {

        document.querySelector('#contentModal .modal .wrapper').innerHTML = `<div class="status">
                    <i class="far ${status.icon} ${status.value}"></i>
                    <strong>${status.title}</strong>
                    <p>${status.content}</p>
                </div>`
    },
    template: function (modal) {

        let tags = ""

        modal.tags.map((tag) => {
            tags += `<span class="tag">${tag}</span>`
        })

        if (modal.cta === "Applied") {
            modal.disabled = "disabled"
        }

        document.querySelector('#contentModal').innerHTML = `<div class="modal" data-modal="${modal.id}" data-status="${modal.status}">
            <div class="content">
                <i class="fas fa-times close" title="Close modal"></i>
                <div class="wrapper">
                    <h3>${modal.title}</h3>

                    <span class="date"><i class="far fa-calendar-alt"></i>${modal.date}</span>

                    <p>${modal.content}</p>
                    ${tags}
                    <div class="cta">
                        <span class="btn dark ${modal.disabled}" data-id="${modal.id}" data-action="${modal.disabled}" data-premium="${modal.premium}">${modal.cta}</span>
                    </div>
                </div>
            </div>
        </div>`
    },
    open: function () {
        document.querySelectorAll('[data-target]')._map( (button) => {

            button.addEventListener('click', () => {

                let modal = button.getAttribute("data-target")

                modal = VH.modals[modal]

                if (button.nextElementSibling.attributes.class.value.indexOf('active') > -1) {
                    modal.cta = "Applied"
                }

                this.template(modal)
                this.close()
                this.apply()

                document.querySelector('body').classList.add('freeze')
            });
        })
    },
    close: function () {
        document.querySelectorAll('.close')._map( (button) => {

            button.addEventListener('click', () => {
                this.release()
            });
        })
    },
    release: function () {
        document.querySelector('body').classList.remove('freeze')
        document.querySelector('#contentModal').innerHTML = ""
    },
    apply: function () {
        document.querySelectorAll('[data-action=""]')._map( (button) => {
            button.addEventListener('click', () => {

                const id = button.getAttribute('data-id')
                const element = document.querySelector(`[data-target="${id}"]`)

                if (button.getAttribute('data-premium') == "true") {

                    this.premium()

                    return
                }

                if (element.nextElementSibling.getAttribute('data-apply') === "false") {
                    this.alert(VH.modals.status.error)

                    return
                }
                this.alert(VH.modals.status.success)

                element.nextElementSibling.classList.add('active')
                element.nextElementSibling.textContent = "Applied"

                button.classList.add('disabled')
            })
        })
    },
    premium: function () {
        document.querySelector('#contentModal .modal .wrapper').innerHTML = `<div class="status">
        <i class="fas fa-exclamation-circle warning"></i>
            <strong>Premium only</strong>
            <p>This webinar is available only for premium users.</p>
            <a href="https://vanhack.com/premium" target="blank" class="btn dark premium">Get Premium</a>
        </div>`;

        document.querySelector('.btn.premium').addEventListener('click', () => {
            this.release()
        })
    },

    init: function () {
        this.open()
    }
}

/**
 * Custom extensions to facilitate the development
 */
VH.Extensions = {
    map: function () {
        // custom map to iterate over NodeList object
        NodeList.prototype._map = Array.prototype.map;
    },

    init: function () {
        this.map()
    }
}

/**
 * Toast messages
 */
VH.toast = {

    timer: false,

    close: function () {
        document.querySelector('#contentToast img').addEventListener('click', () => {
            document.querySelector('#contentToast').innerHTML = ''
        });
    },

    hide: function () {
        const displayTime = 5000

        if (this.timer) {
            clearTimeout(this.timer)
        }

        this.timer = setTimeout(()=> {
            document.querySelector('#contentToast').innerHTML = ''
        }, displayTime)
    },

    error: function () {
        document.querySelector('#contentToast').innerHTML = `<div class="toast error">
                        <span><i class="fas fa-times-circle"></i> Ops, something went wrong with this Event</span>
                        <img src="public/img/close.svg" width="10" height="10" alt="close message">
                    </div>`
        this.hide()
        this.close()
    },

    info: function () {

        const btList = document.querySelector('[data-list]')

        btList.addEventListener('click', () => {

            if (btList.classList.contains("disabled")) {
                return
            }

            btList.classList.add('disabled')

            document.querySelector('#contentToast').innerHTML = `<div class="toast info">
                        <span><i class="fas fa-check-circle"></i> Your name was added to the waiting list</span>
                        <img src="public/img/close.svg" width="10" height="10" alt="close message">
                    </div>`
            this.hide()
            this.close()
        });
    },

    success: function (event) {

        document.querySelector('#contentToast').innerHTML = `<div class="toast success">
                        <span><i class="fas fa-check-circle"></i>See you soon in the ${event}</span>
                        <img src="public/img/close.svg" width="10" height="10" alt="close message">
                    </div>`
        this.hide()
        this.close()
    }
}

/**
 * Events and page interactions
 */
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

                const id = button.previousElementSibling.getAttribute('data-target')

                if (VH.modals[id].premium) {

                    VH.modal.template(VH.modals[id])
                    VH.modal.premium()
                    VH.modal.close()

                    return
                }


                if (button.getAttribute("data-apply") === "true") {
                    if (button.textContent === "Applied") {
                        return
                    }

                    // success
                    button.innerHTML = "Applied";
                    button.classList.add("active")
                    VH.toast.success( VH.modals[id].title )

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

/**
 * Page navigation
 */
VH.navigation = {
    go: function () {
        document.querySelectorAll('menu a')._map( (link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault()

                const marginTop = 70;

                let position = document.querySelector(link.getAttribute('href')).offsetTop
                window.scrollTo({ top: position - marginTop, behavior: 'smooth' });
            })
        })
    },

    toggle: function() {
        document.querySelector('.fa-bars').addEventListener('click', () => {
            document.querySelector('header menu ul').classList.toggle('open')
            document.querySelector('.fa-bars').classList.toggle('fa-times')
        })
    },

    init: function () {
        this.go()
        this.toggle()
    }
}

/**
 * Module initializers
 */
VH.Extensions.init()

VH.modal.init()
VH.events.init()
VH.navigation.init()
VH.toast.info()