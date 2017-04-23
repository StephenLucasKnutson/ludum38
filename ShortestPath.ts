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
    shortestPath = function (start, finish) {
        var distances = {},
            previous = {},
            path = [],
            smallest, vertex, neighbor, alt;

        for (vertex in this.vertices) {
            distances[vertex] = this.INFINITY;
        }
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

            if (!smallest || distances[smallest] === this.INFINITY) {
                continue;
            }

            for (neighbor in this.vertices[smallest]) {
                alt = distances[smallest] + this.vertices[smallest][neighbor];

                if (alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    previous[neighbor] = smallest;

                    this.nodes.add({weight: alt, value: neighbor});
                }
            }
        }

        return path;
    };
}