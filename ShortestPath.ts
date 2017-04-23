// https://raw.githubusercontent.com/mburst/dijkstras-algorithm/master/dijkstras.js
/**
 * Basic priority queue implementation. If a better priority queue is wanted/needed,
 * this code works with the implementation in google's closure library (https://code.google.com/p/closure-library/).
 * Use goog.require('goog.structs.PriorityQueue'); and new goog.structs.PriorityQueue()
 */
import {PriorityQueue} from "./PriorityQueue";
/**
 * Pathfinding starts here
 */
export class Graph {
    INFINITY = 1 / 0;
    vertices = {};

    addVertex = function (name, edges) {
        this.vertices[name] = edges;
    };
    nodes = new PriorityQueue();
    shortestPath = function (start, finish, maxValue) {
        var distances = {},
            previous = {},
            path = [],
            smallest, vertex, neighbor, alt;

        distances[start] = 0;
        this.nodes.add({weight: 0, value: start});

        while (!this.nodes.isEmpty()) {
            smallest = this.nodes.poll().value;

            if (smallest === finish) {
                path = [];

                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }

                break;
            }
            let distancesSmallest = distances[smallest];
            if(distancesSmallest == undefined) {
                distancesSmallest = Infinity
            }

            if (!smallest || distancesSmallest > maxValue) {
                this.nodes.clear();
                return []
            }

            let neighbors = this.vertices[smallest];
            for (neighbor in neighbors) {
                alt = distancesSmallest + neighbors[neighbor];

                let distancesNeighbor = distances[neighbor];
                if(distancesNeighbor == undefined) {
                    distancesNeighbor = Infinity;
                }
                if (alt < distancesNeighbor) {
                    distances[neighbor] = alt;
                    previous[neighbor] = smallest;

                    this.nodes.add({weight: alt, value: neighbor});
                }
            }
        }

        return path;
    };
}