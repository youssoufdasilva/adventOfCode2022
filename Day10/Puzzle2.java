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
    
    public static void main(String[] args) {
        String myFileName = "testinput.txt";
        // String myFileName = "input.txt";

        ArrayList<String> allInstructions = readFile(myFileName);
        // System.out.println(allInstructions);

        int totalSignalStrength = 0;

        int cycleCounter = 1;
        int x = 1;
        int instructionIter = 0;
        int cycleTargetIncrement = 40;
        int cycleTarget = 40;

        int instructionCycleDuration = 0;
        
        // Draw the first pixel because x starts at 1
        System.out.print("#");

        while (instructionIter < allInstructions.size()) {
            String myInstruction = allInstructions.get(instructionIter).substring(0, 4);

            // Set Cycle Duration
            if (instructionCycleDuration == 0) {
                if (myInstruction.trim().equals("noop")) instructionCycleDuration = 1;
                if (myInstruction.trim().equals("addx")) instructionCycleDuration = 2;
            }

            // System.out.println();
            // System.out.print("Cycle Counter = ");
            // System.out.println(cycleCounter);
            // System.out.print("x = ");
            // System.out.println(x);


            // compute signalStrength
            if (cycleCounter == cycleTarget) {
                // cycleTarget += cycleTargetIncrement;
                cycleCounter -= cycleTargetIncrement;
                System.out.println();
                // System.out.print("Cycle Counter = ");
                // System.out.println(cycleCounter);
                // System.out.print("x = ");
                // System.out.println(x);

                totalSignalStrength += cycleCounter * x;
            }

            // execute instruction
            if (instructionCycleDuration > 0) {
                if (instructionCycleDuration == 1) {
                    if (myInstruction.trim().equals("addx")) {
                        int xIncrement = Integer.parseInt(allInstructions.get(instructionIter).substring(4).trim());
                        // if (xIncrement < 0) System.out.print("Removing ");
                        // else System.out.print("Adding ");
                        // System.out.println(xIncrement);

                        x += xIncrement;
                    } 
                    // else System.out.println();

                    // Only Increase the instruction counter when the cycle Duration is about to end
                    instructionIter++;
                }

                instructionCycleDuration--;
            }

            // CRT Draws Pixel
            if (cycleCounter >= x-1 && cycleCounter <= x+1) {
            // if (x == cycleCounter-1 || x == cycleCounter || x == cycleCounter+1) {
                System.out.print("#");
            } else {
                System.out.print(".");
            }

            // Increase cycle counter
            cycleCounter++;
        }

        
      }
}