import Foundation

let string = try String(contentsOfFile: "/Users/mrpaschenko/Developer/ip-0x-lab-1-MrPaschenko/lab1/lab1/File.txt", encoding: String.Encoding.utf8)
let array = string.split(separator: "\n")

let numberOfGeneration = Int(array[0])!

let size = array[1].split(separator: " ")

var arrayMain:[[Any]] = []

for i in 1...Int(size[1])! {
    arrayMain.append(array[1 + i].map { String($0) })
}

//Change "." to 0, "x" to 1
func prepareArray(_ array: [[Any]]) -> [[Int]] {
    var newArray: [[Int]] = []
    
    for i in 0...(array.count - 1) {
        newArray.append([])
        for k in 0...(array[i].count - 1) {
            newArray[i].append(array[i][k] as! String == "." ? 0 : 1)
        }
    }
        
    return newArray
}

func cellInFuture(line: Int, column: Int, in array: [[Int]]) -> Int {
    var neigboursNum = 0
    
    //Calculate alive neighbours in its array
    if column == 0 {
        neigboursNum += array[line][column + 1]
        neigboursNum += array[line].last!
    } else if column == (array[line].count - 1) {
        neigboursNum += array[line][column - 1]
        neigboursNum += array[line][0]
    } else {
        neigboursNum += array[line][column + 1]
        neigboursNum += array[line][column - 1]
    }
    
    //Calculate alive neighbours in array above
    if line == 0 {
        if column == 0 {
            neigboursNum += array.last![column]
            neigboursNum += array.last![column + 1]
            neigboursNum += array.last!.last!
        } else if column == (array.last!.count - 1) {
            neigboursNum += array.last![column]
            neigboursNum += array.last![column - 1]
            neigboursNum += array.last![0]
        } else {
            neigboursNum += array.last![column]
            neigboursNum += array.last![column + 1]
            neigboursNum += array.last![column - 1]
        }
    } else {
        if column == 0 {
            neigboursNum += array[line - 1][column]
            neigboursNum += array[line - 1][column + 1]
            neigboursNum += array[line - 1].last!
        } else if column == (array[line - 1].count - 1) {
            neigboursNum += array[line - 1][column]
            neigboursNum += array[line - 1][column - 1]
            neigboursNum += array[line - 1][0]
        } else {
            neigboursNum += array[line - 1][column]
            neigboursNum += array[line - 1][column + 1]
            neigboursNum += array[line - 1][column - 1]
        }
    }

    //Calculate alive neighbours in array below
    if line == (array.count - 1) {
        if column == 0 {
            neigboursNum += array[0][column]
            neigboursNum += array[0][column + 1]
            neigboursNum += array[0].last!
        } else if column == (array[0].count - 1) {
            neigboursNum += array[0][column]
            neigboursNum += array[0][column - 1]
            neigboursNum += array[0][0]
        } else {
            neigboursNum += array[0][column]
            neigboursNum += array[0][column + 1]
            neigboursNum += array[0][column - 1]
        }
    } else {
        if column == 0 {
            neigboursNum += array[line + 1][column]
            neigboursNum += array[line + 1][column + 1]
            neigboursNum += array[line + 1].last!
        } else if column == (array[line + 1].count - 1) {
            neigboursNum += array[line + 1][column]
            neigboursNum += array[line + 1][column - 1]
            neigboursNum += array[line + 1][0]
        } else {
            neigboursNum += array[line + 1][column]
            neigboursNum += array[line + 1][column + 1]
            neigboursNum += array[line + 1][column - 1]
        }
    }
    var cellInFuture = 0
    
    if array[line][column] == 0 {
        if neigboursNum == 3 {
            cellInFuture = 1
        }
    } else {
        if neigboursNum == 2 || neigboursNum == 3 {
            cellInFuture = 1
        }
    }
    
    return cellInFuture
}

func nextGen(of array: [[Int]]) -> [[Int]] {
    var newArray: [[Int]] = []
    
    for i in 0...(array.count - 1) {
        newArray.append([])
        for k in 0...(array[i].count - 1) {
            newArray[i].append(cellInFuture(line: i, column: k, in: array))
        }
    }
        
    return newArray

}

func nextNumberOfGens(of array: [[Any]], gen: Int) -> [[Int]] {
    var newArray = prepareArray(array)
    
    for i in 1...gen {
        newArray = nextGen(of: newArray)
    }
    
    return newArray
}

func prepareArrayBack(_ array: [[Int]]) -> [[String]] {
    var newArray: [[String]] = []
    
    for i in 0...(array.count - 1) {
        newArray.append([])
        for k in 0...(array[i].count - 1) {
            newArray[i].append(array[i][k] == 0 ? "." : "x")
        }
    }
        
    return newArray
}

var newArray = prepareArrayBack(nextNumberOfGens(of: arrayMain, gen: numberOfGeneration))

var newString = ""
for i in newArray {
    newString.append(i.joined())
    newString.append("\n")
}

print(newString)
try newString.write(toFile: "/Users/mrpaschenko/Developer/ip-0x-lab-1-MrPaschenko/lab1/lab1/File.txt", atomically: true, encoding: .utf8)
