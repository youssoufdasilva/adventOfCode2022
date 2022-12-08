import java.io.File;  // Import the File class
import java.io.FileNotFoundException;  // Import this class to handle errors
import java.util.Scanner; // Import the Scanner class to read text files
import java.util.ArrayList; // import the ArrayList class
import java.lang.Integer;

public class Puzzle1 {

    public static ArrayList<String> readFile(String myFileName) {
        ArrayList<String> fileLines = new ArrayList<String>(); // Create an ArrayList object

        try {
            File myObj = new File(myFileName);
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
                String data = myReader.nextLine();
                // System.out.println(data);
                fileLines.add(data);
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
        return fileLines;
    }

    public static int getTree (ArrayList<String> allTrees, int row, int column) {
        // int currentTree = Integer.parseInt(allTrees.get(rowIter).charAt(columnIter));
        return Integer.parseInt( Character.toString( allTrees.get(row).charAt(column) ) );
    }

    public static boolean checkTreeVisibility(ArrayList<String> allTrees, int row, int column) {
        // Current Tree
        int myTree = getTree(allTrees, row, column);

        // System.out.print("Checking myTree >");
        // System.out.print(myTree);
        // System.out.print("< to the topTree >");
        // System.out.print(topTree);
        // System.out.print("<, the bottomTree >");
        // System.out.print(bottomTree);
        // System.out.print("<, the leftTree >");
        // System.out.print(leftTree);
        // System.out.print("< and the rightTree >");
        // System.out.print(rightTree);
        // System.out.println("<");

        boolean isVisibleFromTop = false;
        boolean isVisibleFromBottom = false;
        boolean isVisibleFromLeft = false;
        boolean isVisibleFromRight = false;

        // Check top trees
        int topRowIndex = 0;
        while (topRowIndex < row) {
            int topTree = getTree(allTrees, topRowIndex, column);
            if (topTree < myTree) isVisibleFromTop = true;
            else {
                isVisibleFromTop = false;
                break;
            }
            topRowIndex++;
        }

        // Check bottom trees
        int bottomRowIndex = allTrees.size() - 1;
        while (bottomRowIndex > row ) {
            int bottomTree = getTree(allTrees, bottomRowIndex, column);
            if (bottomTree < myTree) isVisibleFromBottom = true;
            else {
                isVisibleFromBottom = false;
                break;
            }
            bottomRowIndex--;
        }

        // Check left trees
        int leftColumnIndex = 0;
        while (leftColumnIndex < column) {
            int leftTree = getTree(allTrees, row, leftColumnIndex);
            if (leftTree < myTree) isVisibleFromLeft = true;
            else {
                isVisibleFromLeft = false;
                break;
            }
            leftColumnIndex++;
        }

        // Check right trees
        int rightColumnIndex = allTrees.get(row).length() - 1;
        while (rightColumnIndex > column) {
            int rightTree = getTree(allTrees, row, rightColumnIndex);
            if (rightTree < myTree) isVisibleFromRight = true;
            else {
                isVisibleFromRight = false;
                break;
            }
            rightColumnIndex--;
        }

        // System.out.print(isVisibleFromTop);
        // System.out.print(isVisibleFromBottom);
        // System.out.print(isVisibleFromLeft);
        // System.out.print(isVisibleFromRight);

        if (isVisibleFromTop || isVisibleFromBottom || isVisibleFromLeft || isVisibleFromRight) return true;
        
        return false;
    }
    
    public static void main(String[] args) {
        // String myFileName = "testinput.txt";
        String myFileName = "input.txt";

        ArrayList<String> allTrees = readFile(myFileName);

        int visibleTreeCount = 0, rowIter = 1;
        
        visibleTreeCount += allTrees.size() * 2;
        visibleTreeCount += (allTrees.get(0).length() - 2) * 2;

        while (rowIter < allTrees.size() - 1) {
            int columnIter = 1;

            while (columnIter < allTrees.get(rowIter).length() - 1) {
                // Check tree visibility
                boolean treeIsVisible = checkTreeVisibility(allTrees, rowIter, columnIter);

                if (treeIsVisible) {
                    // System.out.println("It's visible!");
                    visibleTreeCount++;
                }

                columnIter++;
            }
            rowIter++;
        }
        System.out.print("visibleTreeCount = ");
        System.out.println(visibleTreeCount);
        
      }
}