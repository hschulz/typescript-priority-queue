/**
 * Defines a pseudo-storage that accepts only numbers as keys
 * for a collection of elements.
 */
export interface Item<T> {
    [index: number]: T[]
}

/**
 *
 */
export class PriorityQueue<T> {

    /** Determine if queue is reversed to largest to lowest */
    protected _isReversed: boolean = false
    get isReversed() { return this._isReversed }
    set isReversed(value: boolean) {

        /** Assign value */
        this._isReversed = value

        this.sortKeys()
    }

    /** Store all known priorities */
    protected keys: number[] = []

    /** Actual item queue */
    protected _items: Item<T> = {}
    get items() { return this._items }
    set items(value: Item<T>) {

        /** Iterate the given items */
        for (let i in value) {

            /** Parse numerical representation */
            let priority: number = parseInt(i, 10)

            /** Init data store */
            let data: T|undefined

            /** Iterate through data */
            while ((data = value[priority].shift()) !== undefined) {

                /** Use actual setter to add data */
                this.add(data, priority)
            }
        }
    }

    /**
     * Default sorting function for numerical arrays.
     *
     * @param n1 The first number
     * @param n2 The second number
     */
    protected sort(n1: number, n2: number) {
        return (n1 > n2) ? 1 : -1
    }

    /**
     * Sort the internal key references.
     */
    protected sortKeys(): void {

        /** Sort "normal" */
        this.keys.sort(this.sort)

        /** Reverse after sort if set */
        if (this._isReversed) {
            this.keys.reverse()
        }
    }

    /**
     * Adds an element to the queue.
     *
     * @param data Some element
     * @param priority A priority value
     */
    public add(data: T, priority: number): void {

        /** Create store if not set */
        if (!this._items[priority]) {
            this._items[priority] = []
        }

        /** Add priority to list of known keys */
        if (this.keys.indexOf(priority) === -1) {
            this.keys.push(priority)

            this.sortKeys()
        }

        /** Add item to queue */
        this._items[priority].push(data)
    }

    /**
     * Removes an item from the queue.
     *
     * @param data Some element that is in the queue
     * @param priority The priority of the item to remove
     * @returns true if the element was removed; false otherwise
     */
    public remove(data: T, priority: number): boolean {

        if (this._items[priority]) {

            for (let index in this._items) {
                const position: number = this._items[index].indexOf(data)

                if (position > -1) {
                    this._items[index].splice(position, 1)
                    return true
                }
            }
        }

        return false
    }

    /**
     * Returns the next element from the queue.
     * Order is determined by the 'isReversed' memeber.
     *
     * @returns Either the next item or undefined
     */
    public getNext(): T|undefined {

        /** Iterate over index storage instead of items */
        for (let index of this.keys) {

            /** Test if index has items */
            if (this._items[index].length === 0) {
                continue
            }

            /** Return first item */
            return this._items[index].shift()
        }

        return undefined
    }
}
