import java.io.File;  // Import the File class
import java.io.FileNotFoundException;  // Import this class to handle errors
import java.util.Scanner; // Import the Scanner class to read text files
import java.util.ArrayList; // import the ArrayList class
import java.lang.Integer;

public class Puzzle2 {

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

        if (isVisibleFromTop || isVisibleFromBottom || isVisibleFromLeft || isVisibleFromRight) return true;
        
        return false;
    }
    
    public static int getTreeScenicScore(ArrayList<String> allTrees, int row, int column) {
        // Current Tree
        int myTree = getTree(allTrees, row, column);

        int topScore = 1;
        int bottomScore = 1;
        int leftScore = 1;
        int rightScore = 1;

        // Check top trees
        int topRowIndex = row - 1;
        while (topRowIndex >= 0) {
            int topTree = getTree(allTrees, topRowIndex, column);
            if (topTree >= myTree) break;
            if (topTree <= myTree && topRowIndex != 0) topScore++;

            topRowIndex--;
        }

        // Check bottom trees
        int bottomRowIndex = row + 1;
        while (bottomRowIndex <= allTrees.size() - 1) {
            int bottomTree = getTree(allTrees, bottomRowIndex, column);
            if (bottomTree >= myTree) break;
            if (bottomTree <= myTree && bottomRowIndex != allTrees.size() - 1) bottomScore++;
            bottomRowIndex++;
        }

        // Check left trees
        int leftColumnIndex = column - 1;
        while (leftColumnIndex >= 0) {
            int leftTree = getTree(allTrees, row, leftColumnIndex);
            if (leftTree >= myTree) break;
            if (leftTree <= myTree && leftColumnIndex != 0) leftScore++;
            leftColumnIndex--;
        }

        // Check right trees
        int rightColumnIndex = column + 1;
        while (rightColumnIndex <= allTrees.get(row).length() - 1) {
            int rightTree = getTree(allTrees, row, rightColumnIndex);
            if (rightTree >= myTree) break;
            if (rightTree <= myTree && rightColumnIndex != allTrees.get(row).length() - 1) rightScore++;
            rightColumnIndex++;
        }
        
        return topScore * bottomScore * leftScore * rightScore;
    }

    public static void main(String[] args) {
        // String myFileName = "testinput.txt";
        String myFileName = "input.txt";

        ArrayList<String> allTrees = readFile(myFileName);

        int visibleTreeCount = 0, maxScenicScore = 0;
        
        visibleTreeCount += allTrees.size() * 2;
        visibleTreeCount += (allTrees.get(0).length() - 2) * 2;
        
        int rowIter = 1;
        while (rowIter < allTrees.size() - 1) {
            int columnIter = 1;

            while (columnIter < allTrees.get(rowIter).length() - 1) {
                // Check tree visibility
                boolean treeIsVisible = checkTreeVisibility(allTrees, rowIter, columnIter);
                if (treeIsVisible) visibleTreeCount++;

                // Check Scenic Score
                int treeScenicScore = getTreeScenicScore(allTrees, rowIter, columnIter);
                if (treeScenicScore > maxScenicScore) maxScenicScore = treeScenicScore;

                columnIter++;
            }
            rowIter++;
        }

        System.out.print("visibleTreeCount = ");
        System.out.println(visibleTreeCount);

        System.out.print("\nmaxScenicScore = ");
        System.out.println(maxScenicScore);
        
      }
}