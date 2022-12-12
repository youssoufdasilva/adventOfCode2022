import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

public class Dijkstra {

  // Helper class for representing a node in the grid
  private static class Node implements Comparable<Node> {
    // The row and column coordinates of the node
    int row, col;
    // The distance from the starting point to this node
    int distance;

    public Node(int row, int col, int distance) {
      this.row = row;
      this.col = col;
      this.distance = distance;
    }

    // Compare nodes based on their distance from the starting point
    @Override
    public int compareTo(Node other) {
      return Integer.compare(this.distance, other.distance);
    }
  }

  // Helper function for checking if a given row and column is within the bounds of the grid
  private static boolean isValid(int row, int col, char[][] grid) {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
  }

  // Find the shortest path from the starting point 'S' to the end point 'E' in the given grid
  public static int shortestPath(char[][] grid) {
    // Store the starting position of the path
    int startRow = 0, startCol = 0;
    for (int i = 0; i < grid.length; i++) {
      for (int j = 0; j < grid[0].length; j++) {
        if (grid[i][j] == 'S') {
          startRow = i;
          startCol = j;
          break;
        }
      }
    }

    // Initialize a map for storing the distances from the starting point to each node
    Map<Integer, Map<Integer, Integer>> distances = new HashMap<>();
    // Initialize a priority queue for choosing the next node to visit based on its distance from the starting point
    PriorityQueue<Node> queue = new PriorityQueue<>();
    // Add the starting point to the queue with a distance of 0
