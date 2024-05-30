const N = 100
const X = 50
const S = 'S'

class Boxes {
    #boxes

    constructor() {
        this.#boxes = Array.from({length: N}, (_, i) => i)
        this.#rnd()
    }

    at (i) {
        return this.#boxes[i]
    }

    #rnd () {
        let i = this.#boxes.length
        while (i > 0) {
            const randomIndex = Math.floor(Math.random() * i--);
            [this.#boxes[i], this.#boxes[randomIndex]] = [this.#boxes[randomIndex], this.#boxes[i]]
        }
    }
}

class Algo {
    exec (prisonerN, boxes) {
        throw new Error('Must extend.')
    }
}

class RandAlgo extends Algo {
    exec(prisonerN, boxes) {
        let x = 0,
            box = null
        while (x < X) {
            box = boxes.at(Math.floor(Math.random() * N))

            if (box === prisonerN) {
                return true
            }

            ++x
        }

        return false
    }
}

class FindAlgo extends Algo {
    exec(prisonerN, boxes) {
        let x = 0,
            p = prisonerN,
            box = null

        while (x < X) {
            box = boxes.at(p)

            if (box === prisonerN) {
                return true
            }

            p = box
            ++x
        }

        return false
    }
}

class Prisoners {
    #prisoners
    #boxes

    constructor(boxes) {
        this.#boxes = boxes
        this.#prisoners = Array.from({length: N}, (_, i) => i).reverse()
    }

    /**
     * @param {Algo} algo
     */
    next(algo) {
        if (this.#prisoners.length === 0) {
            return S
        }

        return algo.exec(this.#prisoners.pop(), this.#boxes)
    }
}

//const ALGO = RandAlgo
const ALGO = FindAlgo
const TIMES = 100_000

let successful = 0

for (let t = 0; t < TIMES; ++t) {
    const boxes = new Boxes()
    const prisoners = new Prisoners(boxes)
    const algo = new ALGO()

    let s
    while ((s = prisoners.next(algo))) {
        if (s === S) {
            ++successful
            break
        }
    }
}

console.log(`Out of ${TIMES} tries, a total of ${successful} prisoner parties made it out alive!`)
console.log(`That's about ${((successful / TIMES) * 100).toFixed(2)}%`)