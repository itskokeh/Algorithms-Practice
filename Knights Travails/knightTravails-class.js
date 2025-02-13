'use strict'

class KnightMove {
  constructor (position, path) {
    this.position = position // [x, y] coordinates
    this.path = path // Array of positions leading to this move
  }
}

class Chessboard {
  constructor (size = 8) {
    this.size = size
  }

  isInsideBoard (x, y) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size
  }

  getValidMoves ([x, y]) {
    const possibleMoves = [
      [2, 1], [2, -1], [-2, 1], [-2, -1],
      [1, 2], [1, -2], [-1, 2], [-1, -2]
    ]

    return possibleMoves
      .map(([dx, dy]) => [x + dx, y + dy])
      .filter(([nx, ny]) => this.isInsideBoard(nx, ny))
  }
}

class KnightSolver {
  constructor (board) {
    this.board = board
  }

  findShortestPath (start, end) {
    const queue = [new KnightMove(start, [start])]
    const visited = new Set()
    visited.add(start.toString())

    while (queue.length > 0) {
      const currentMove = queue.shift()
      const [x, y] = currentMove.position

      if (x === end[0] && y === end[1]) {
        return currentMove.path
      }

      for (const newPosition of this.board.getValidMoves(currentMove.position)) {
        const posStr = newPosition.toString()
        if (!visited.has(posStr)) {
          visited.add(posStr)
          queue.push(new KnightMove(newPosition, [...currentMove.path, newPosition]))
        }
      }
    }

    return [] // No valid path found (unlikely on a chessboard)
  }
}

// Example Usage:
const board = new Chessboard(8)
const solver = new KnightSolver(board)

const startPosition = [0, 0]
const endPosition = [7, 7]

const shortestPath = solver.findShortestPath(startPosition, endPosition)
console.log(`Shortest Path (${shortestPath.length - 1} moves):`, shortestPath)
