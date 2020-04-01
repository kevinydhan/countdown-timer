class CountdownTimer {
    /**
     * References the amount of time, in milleseconds, between each iteration
     * of the timer.
     */
    timerInterval = 1000

    /**
     * References the HTML element where the time will be displayed.
     */
    timerText

    /**
     * Contains an object literal with the following keys:
     *
     * @example { minutes: 25, seconds 0 }
     */
    display

    /**
     * References the total time, in milleseconds, specified for the timer.
     */
    totalTime

    /**
     * References the remaining time, in milleseconds, for the timer.
     */
    remainingTime

    /**
     *
     * @param {HTMLElement} options.elements.timerText - HTML element that will display the time
     * @param {HTMLElement} options.elements.startButton - HTML element that will start the timer when clicked
     * @param {HTMLElement} options.elements.pauseButton - HTML element that will pause the timer when clicked
     * @param {HTMLElement} options.elements.resetButton - HTML element that will reset the timer when clicked
     *
     * @param {number} options.remainingTime.minutes - Number of minutes
     * @param {number} options.remainingTime.seconds - Number of seconds
     *
     * @param {string} options.audioPath - Path to the audio file
     */
    constructor(options) {
        const { elements, remainingTime, audioPath } = options

        this.timerText = elements.timerText
        this.display = { ...remainingTime }
        this.totalTime = this.remainingTime = parseInt(this.display.seconds) * 1000 + parseInt(this.display.minutes) * 1000 * 60
        this.audio = new Audio(audioPath)

        this.associateEventListeners(elements)
        this.updateDisplay()
    }

    associateEventListeners = (elements) => {
        elements.startButton.addEventListener('click', this.start)
        elements.pauseButton.addEventListener('click', this.pause)
        elements.resetButton.addEventListener('click', this.reset)
    }

    start = () => {
        if (!this.interval) {
            this.interval = setInterval(this.updateTimer, this.timerInterval)
        }
    }

    pause = () => this.interval = clearInterval(this.interval)

    reset = () => {
        this.pause()
        this.remainingTime = this.totalTime
        this.updateDisplay()
    }

    updateTimer = () => {
        this.remainingTime -= this.timerInterval
        this.updateDisplay()

        if (this.remainingTime < this.timerInterval) {
            this.pause()
            this.audio.play()
        }
    }

    updateDisplay = () => {
        this.display.minutes = Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60))
        this.display.seconds = Math.floor((this.remainingTime % (1000 * 60)) / 1000)
        this.timerText.innerHTML = `${this.display.minutes}m ${this.display.seconds}s`
    }
}

const timer = new CountdownTimer({
    elements: {
        timerText: document.querySelector('.countdown'),
        startButton: document.querySelector('.start-button'),
        pauseButton: document.querySelector('.pause-button'),
        resetButton: document.querySelector('.reset-button')
    },
    remainingTime: {
        minutes: 25,
        seconds: 0
    },
    audioPath: './alarm.wav'
})
