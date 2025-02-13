'use strict'

function isValid (x, y, boardSize) {
  return x >= 0 && x < boardSize && y >= 0 && y < boardSize
}

function getKnightMoves (x, y, boardSize) {
  const moves = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2]
  ]

  return moves
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(([nx, ny]) => isValid(nx, ny, boardSize))
}

function knightTravails (start, end, boardSize = 8) {
  const queue = [[start, [start]]] // (current position, path)
  const visited = new Set()
  visited.add(start.toString())

  while (queue.length > 0) {
    const [[x, y], path] = queue.shift()

    if (x === end[0] && y === end[1]) {
      return path // Return the shortest path
    }

    for (const [nx, ny] of getKnightMoves(x, y, boardSize)) {
      const posStr = [nx, ny].toString()
      if (!visited.has(posStr)) {
        visited.add(posStr)
        queue.push([[nx, ny], [...path, [nx, ny]]])
      }
    }
  }

  return [] // No valid path (shouldn't happen on a normal chessboard)
}

// Example Usage:
const startPos = [0, 0]
const endPos = [7, 7]
const shortestPath = knightTravails(startPos, endPos)
console.log(`Shortest Path (${shortestPath.length - 1} moves):`, shortestPath)
