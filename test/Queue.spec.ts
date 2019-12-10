import { Item, PriorityQueue } from '../index'
import { expect } from 'chai'

describe('Queue', () => {

    it('should add an element', () => {

        let queue: PriorityQueue<string> = new PriorityQueue<string>()

        queue.add('test', 10)

        expect(queue.getNext()).to.equal('test')
    })

    it('should add multiple elements in the prioritized order', () => {

        let queue: PriorityQueue<number> = new PriorityQueue<number>()

        queue.add(5, 100)
        queue.add(100, 5)
        queue.add(105, 105)

        expect(queue.getNext()).to.equal(100)
        expect(queue.getNext()).to.equal(5)
        expect(queue.getNext()).to.equal(105)
        expect(queue.isReversed).to.be.false
    })

    it('should reverse elements in the prioritized order', () => {

        let queue: PriorityQueue<number> = new PriorityQueue<number>()

        queue.isReversed = true

        queue.add(5, 100)
        queue.add(100, 5)
        queue.add(105, 105)

        expect(queue.getNext()).to.equal(105)
        expect(queue.getNext()).to.equal(5)
        expect(queue.getNext()).to.equal(100)
        expect(queue.isReversed).to.be.true
    })

    it('should not reverse elements in the prioritized order when disabled', () => {

        let queue: PriorityQueue<number> = new PriorityQueue<number>()

        queue.isReversed = true

        queue.add(5, 100)
        queue.add(100, 5)
        queue.add(105, 105)

        queue.isReversed = false

        expect(queue.getNext()).to.equal(100)
        expect(queue.getNext()).to.equal(5)
        expect(queue.getNext()).to.equal(105)
        expect(queue.isReversed).to.be.false
    })

    it('should add multiple elements to the same priority', () => {

        let queue: PriorityQueue<string> = new PriorityQueue<string>()

        queue.add('test', 1)
        queue.add('mocha', 1)
        queue.add('chai', 1)

        expect(queue.getNext()).to.equal('test')
        expect(queue.getNext()).to.equal('mocha')
        expect(queue.getNext()).to.equal('chai')
    })

    it('should remove an previously added element', () => {

        let queue: PriorityQueue<string> = new PriorityQueue<string>()

        queue.add('test', 1)
        queue.add('mocha', 12)
        queue.add('chai', 123)

        queue.remove('mocha', 12)

        expect(queue.getNext()).to.equal('test')
        expect(queue.getNext()).to.equal('chai')
    })

    it('should remove the exact object', () => {

        interface Test {
            value: string
        }

        const obj: Test = { value: 'test' }

        let queue: PriorityQueue<Test> = new PriorityQueue<Test>()

        queue.add(obj, 1)

        expect(queue.remove(obj, 1)).to.be.true

        expect(queue.getNext()).to.be.undefined
    })

    it('should not remove a similar object', () => {

        interface Test {
            value: string
        }

        let queue: PriorityQueue<Test> = new PriorityQueue<Test>()

        queue.add({ value: 'test' }, 1)

        expect(queue.remove({ value: 'test' }, 1)).to.be.false

        expect(queue.getNext()).to.not.be.undefined
    })

    it('should not remove the exact object with the wrong priority', () => {

        interface Test {
            value: string
        }

        const obj: Test = { value: 'test' }

        let queue: PriorityQueue<Test> = new PriorityQueue<Test>()

        queue.add(obj, 1)

        expect(queue.remove(obj, 2)).to.be.false

        expect(queue.getNext()).to.not.be.undefined
    })

    it('should return undefined when empty', () => {

        let queue: PriorityQueue<string> = new PriorityQueue<string>()

        expect(queue.getNext()).to.be.undefined
    })

    it('should return the items', () => {

        let queue: PriorityQueue<number> = new PriorityQueue<number>()

        queue.add(1, 0)
        queue.add(11, 0)
        queue.add(111, 0)

        const items: Item<number> = queue.items

        expect(items[0].length).to.equal(3)
    })

    it('should set the items', () => {

        let queue: PriorityQueue<number> = new PriorityQueue<number>()

        let items: Item<number> = {}
        items[1] = [2, 1]
        items[0] = [0]

        queue.items = items

        expect(queue.getNext()).to.equal(0)
        expect(queue.getNext()).to.equal(2)
        expect(queue.getNext()).to.equal(1)
    })
})
