//Modified
//take from https://raw.githubusercontent.com/lemire/FastPriorityQueue.js/master/FastPriorityQueue.js
/**
 * FastPriorityQueue.js : a fast heap-based priority queue  in JavaScript.
 * (c) the authors
 * Licensed under the Apache License, Version 2.0.
 *
 * Speed-optimized heap-based priority queue for modern browsers and JavaScript engines.
 *
 * Usage :
 Installation (in shell, if you use node):
 $ npm install fastpriorityqueue

 Running test program (in JavaScript):

 // var FastPriorityQueue = require("fastpriorityqueue");// in node
 var x = new FastPriorityQueue();
 x.add(1);
 x.add(0);
 x.add(5);
 x.add(4);
 x.add(3);
 x.peek(); // should return 0, leaves x unchanged
 x.size; // should return 5, leaves x unchanged
 while(!x.isEmpty()) {
           console.log(x.poll());
         } // will print 0 1 3 4 5
 x.trim(); // (optional) optimizes memory usage
 */

export class PriorityQueue {
    array: any[] = [];
    size: number = 0;
    compare = function (a, b) {
        return a.weight < b.weight;
    };

    add = function (myval) {
        var i = this.size;
        this.array[this.size] = myval;
        this.size += 1;
        var p;
        var ap;
        while (i > 0) {
            p = (i - 1) >> 1;
            ap = this.array[p];
            if (!this.compare(myval, ap)) {
                break;
            }
            this.array[i] = ap;
            i = p;
        }
        this.array[i] = myval;
    };
    heapify = function (arr) {
        this.array = arr;
        this.size = arr.length;
        var i;
        for (i = (this.size >> 1); i >= 0; i--) {
            this._percolateDown(i);
        }
    };
    _percolateUp = function (i) {
        var myval = this.array[i];
        var p;
        var ap;
        while (i > 0) {
            p = (i - 1) >> 1;
            ap = this.array[p];
            if (!this.compare(myval, ap)) {
                break;
            }
            this.array[i] = ap;
            i = p;
        }
        this.array[i] = myval;
    };
    _percolateDown = function (i) {
        var size = this.size;
        var hsize = this.size >>> 1;
        var ai = this.array[i];
        var l;
        var r;
        var bestc;
        while (i < hsize) {
            l = (i << 1) + 1;
            r = l + 1;
            bestc = this.array[l];
            if (r < size) {
                if (this.compare(this.array[r], bestc)) {
                    l = r;
                    bestc = this.array[r];
                }
            }
            if (!this.compare(bestc, ai)) {
                break;
            }
            this.array[i] = bestc;
            i = l;
        }
        this.array[i] = ai;
    };
    peek = function () {
        if(this.size == 0) return undefined;
        return this.array[0];
    };
    poll = function () {
        if (this.size == 0)
            return undefined;
        var ans = this.array[0];
        if (this.size > 1) {
            this.array[0] = this.array[--this.size];
            this._percolateDown(0 | 0);
        } else {
            this.size -= 1;
        }
        return ans;
    };
    trim = function () {
        this.array = this.array.slice(0, this.size);
    };
    isEmpty = function () {
        return this.size === 0;
    };
}