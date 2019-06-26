import IntervalBasedTimer from './IntervalBasedTimer'

export default class Keyboard extends IntervalBasedTimer {

    protected spaceReleased = true

    constructor () {
        super()

        this.keydown = this.keydown.bind(this)
        this.keyup = this.keyup.bind(this)

        window.addEventListener('keydown', this.keydown, true)
        window.addEventListener('keyup', this.keyup, true)
    }

    teardown () {
        window.removeEventListener('keydown', this.keydown, true)
        window.removeEventListener('keyup', this.keyup, true)
    }

    /**
     * Triggered on a keydown event. Pushing down on the space key resets any previous timers
     * and stops the currently active run.
     *
     * @param event
     */
    keydown (event: KeyboardEvent) {
        if (event.key !== ' ') return

        // Workaround for the keydown event triggering multiple times
        if (!this.spaceReleased) return
        this.spaceReleased = false

        if (this.emitter.isRunning) {
            this.emitter.stop()
        } else {
            this.emitter.reset()
            this.emitter.ready()
        }
    }

    /**
     * Triggered on a keyup event. Releasing the space key starts the timer.
     *
     * @param event
     */
    keyup (event: KeyboardEvent) {
        if (event.key !== ' ') return
        this.spaceReleased = true

        if (this.emitter.isRunning || !this.emitter.isReady) return
        this.emitter.start()
    }
}