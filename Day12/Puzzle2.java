import java.io.File;  // Import the File class
import java.io.FileNotFoundException;  // Import this class to handle errors
import java.util.Scanner; // Import the Scanner class to read text files
import java.util.ArrayList; // import the ArrayList class
import java.lang.Integer;
import java.util.LinkedList;
import java.util.Queue;
import java.util.HashSet;
import java.util.Hashtable;

public class Puzzle2 {

    public static ArrayList<String> readFile(String myFileName) {
        // Create an ArrayList object
        ArrayList<String> fileLines = new ArrayList<String>(); 

        try {
            File myObj = new File(myFileName);
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
                String data = myReader.nextLine();
                fileLines.add(data);
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
        return fileLines;
    }

    public static ArrayList<int[]> getAllTargetCoords (String target, ArrayList<String> map) {
        
        ArrayList<int[]> targetCoords = new ArrayList<int[]>(); 
        
        int myRowIterator = 0;
        while (myRowIterator < map.size()) {
            int myColumnIterator = 0;
            while (myColumnIterator < map.get(myRowIterator).length()) {
                if (Character.toString( map.get(myRowIterator).charAt(myColumnIterator) ).equals(target)) {
                    int[] myCoords = {myRowIterator, myColumnIterator};
                    targetCoords.add(myCoords);
                }
                myColumnIterator++;
            }
            myRowIterator++;
        }
        return targetCoords;
    }

    public static ArrayList<int[]> getAdjacentElevationsv1(int[] myLocation) {
        ArrayList<int[]> adjacentElevations = new ArrayList<int[]>();

        int myRowIterator = myLocation[0] - 1;
        while (myRowIterator <= myLocation[0] + 1) {
            int myColumnIterator = myLocation[1] - 1;
            while (myColumnIterator <= myLocation[1] + 1) {
                if (myRowIterator == myLocation[0] && myColumnIterator == myLocation[1]) {
                    myColumnIterator++;
                } else {
                    int[] node = {myRowIterator, myColumnIterator};
                    adjacentElevations.add(node);
                    myColumnIterator++;
                }
            }
            myRowIterator++;
        }
        return adjacentElevations;
    }

    public static ArrayList<int[]> getAdjacentElevations(int[] myLocation) {
        ArrayList<int[]> adjacentElevations = new ArrayList<int[]>();

        int[] nodeAbove = {myLocation[0] - 1, myLocation[1]};
        adjacentElevations.add(nodeAbove);

        int[] nodeBelow = {myLocation[0] + 1, myLocation[1]};
        adjacentElevations.add(nodeBelow);

        int[] leftNode = {myLocation[0], myLocation[1] - 1};
        adjacentElevations.add(leftNode);

        int[] rightNode = {myLocation[0], myLocation[1] + 1};
        adjacentElevations.add(rightNode);

        return adjacentElevations;
    }

    public static String getString(int[] coords) {
        return "" + coords[0] + "-" + coords[1];
    }

    public static String getElevation(int[] coords, ArrayList<String> map) {
        return Character.toString(map.get(coords[0]).charAt(coords[1]));
    }

    public static int findShortestPath(int[] start, int[] target, ArrayList<String> heightmap) {
        
        // Create a HashSet object called set
        // HashSet<String> visited = new HashSet<String>();
        // int[][] visited = new String[heightmap.size() * heightmap.get(0).length()];;
        boolean[][] visited = new boolean [heightmap.size()][heightmap.get(0).length()];

        for (int i = 0; i < visited.length; i++) {
            for (int j = 0; j < visited[i].length; j++) {
                visited[i][j] = false;
            }
        }
        // System.out.println("Initialized Visited checker!");
        // make a 2d array for the cost
        int[][] costMap = new int [heightmap.size()][heightmap.get(0).length()];
        
        // the cost of the start is 0
        costMap[start[0]][start[1]] = 0;

        // if (visited[start[0]][start[1]] == true ) {
        //     System.out.println("Start already visited!");
        // } else {
        //     System.out.println("Start *NOT* visited!");
        // }

        Queue<int[]> queue = new LinkedList<>();
        queue.add(start);

        int currentAscii = (int) "a".charAt(0);

        while (!queue.isEmpty()) {
            // Returns the first item in the linked list and removes it from the list
            // int queueSize = queue.size();

            // for (int i = 0; i < queueSize; i++) {
                int[] currentNode = queue.poll();
                
                if (visited[currentNode[0]][currentNode[1]] == true) {
                    continue;
                } else {
                    int newCost = costMap[currentNode[0]][currentNode[1]] + 1;

                    visited[currentNode[0]][currentNode[1]] = true;
                    
                    String currentElevation = getElevation(currentNode, heightmap);
                    if (currentElevation.equals("E")) currentElevation = "z";
                    if (currentElevation.equals("S")) currentElevation = "a";

                    
                    // System.out.print("\nCurrent elevation ");
                    // System.out.print(currentElevation);
                    // System.out.print(" @ position ");
                    // System.out.println(getString(currentNode));
    
                    if (currentNode[0] == start[0] && currentNode[1] == start[1]) {// && i == 0) {
    
                        // System.out.print("\nStarting square elevation's cost = ");
                        // System.out.println(newCost - 1);
                        
                    } else {
                        currentAscii = (int) currentElevation.charAt(0);
                    }
        
                    // get adjacent nodes
                    ArrayList<int[]> adjacentNodes = getAdjacentElevations(currentNode);
    
                    int nodeIterator = 0; 
                    while (nodeIterator < adjacentNodes.size()) {
                        int[] destination = adjacentNodes.get(nodeIterator);
        
                        int row = destination[0];
                        int col = destination[1];
                        // check whether the adjancent nodes are within the boundaries of the area map
                        // System.out.print("Checking ");
                        // System.out.println(getString(destination));
                        // System.out.print(". Within map boundaries? \t|  ");
                        
                        if (row >= 0 && row < heightmap.size()) {
                            if (col >= 0 && col < heightmap.get(row).length()) {
                                // update destination if needed
                                // System.out.println(costMap[destination[0]][destination[1]]);
    
                                // check if the elevation is acceptable
                                String newElevation = getElevation(destination, heightmap);
                                if (newElevation.equals("E")) newElevation = "z";
                                if (newElevation.equals("S")) newElevation = "a";

        
                                // update visited set and/or queue if not visited before
                                // if (!visited.contains(getString(destination))) {
                                if (visited[destination[0]][destination[1]] == false) {
    
                                    int newAscii = (int) newElevation.charAt(0);
                
                                    if (newAscii == currentAscii || newAscii == currentAscii+1 || newAscii < currentAscii ) {
    
                                        queue.add(destination);
                                        
                                        // System.out.print("Adding to queue :: new elevation ");
                                        // System.out.print(newElevation);
                                        // System.out.print(" @ position ");
                                        // System.out.println(getString(destination));
    
                                        if (costMap[destination[0]][destination[1]] == 0 || costMap[destination[0]][destination[1]] != newCost) {
                                            // System.out.print("Updating cost for elevation @ position ");
                                            // System.out.print(getString(destination));
                                            // System.out.print(" from ");
                                            // System.out.print(costMap[destination[0]][destination[1]]);
                                            // System.out.print(" to ");
                                            // System.out.println(newCost);
            
                                            costMap[destination[0]][destination[1]] = newCost;
                                        }
    
                                    } else {
                                        // System.out.print("\tNot adding new elevation ");
                                        // System.out.print(newElevation);
                                        // System.out.print(" @ position ");
                                        // System.out.print(getString(destination));
                                        // System.out.println(" to queue! ");
        
                                    }
                                }
                            } else {
                                // System.out.println("\t\tThe COLUMN is out of bounds!");
                            }
                        } else {
                            // System.out.println("\t\tThe ROW is out of bounds!");
                        }
                        nodeIterator++;
                    }
                }
        }     
        // System.out.println();
        // System.out.println(stepCounter);
        // System.out.println(costMap[end[0]][end[1]]); 
        // System.out.println();

        
        // for (int i = 0; i < costMap.length; i++) {
        //     for (int j = 0; j < costMap[i].length; j++) {
        //         System.out.print(costMap[i][j]);
        //         System.out.print("\t");
        //     }
        //     System.out.println();
        // }

        return costMap[target[0]][target[1]];
    }
    
    public static void main(String[] args) {
        // String myFileName = "testinput.txt";
        String myFileName = "input.txt";

        ArrayList<String> heightmap = readFile(myFileName);
        ArrayList<int[]> possibleEnds = getAllTargetCoords("E", heightmap);
        int[] end = possibleEnds.get(0);        
        
        ArrayList<int[]> possibleStarts = getAllTargetCoords("S", heightmap);
        int[] start = possibleStarts.get(0);

        ArrayList<int[]> possibleStarts2 = getAllTargetCoords("a", heightmap);
        System.out.print("Num of choices = ");
        System.out.println(possibleStarts2.size() + 1);

        int lowestEnd = findShortestPath(start, end, heightmap);
        System.out.println(lowestEnd);

        int startIter = 0;
        while (startIter < possibleStarts2.size()) {
            int[] newStart = possibleStarts2.get(startIter);
            int tempLowestEnd = findShortestPath(newStart, end, heightmap);
            
            if (tempLowestEnd > 0) {
                System.out.println(tempLowestEnd);

                if (tempLowestEnd < lowestEnd) {
                    lowestEnd = tempLowestEnd;
                }
            }
            startIter++;
        }

        System.out.println();
        System.out.println(lowestEnd); 

    }
}
