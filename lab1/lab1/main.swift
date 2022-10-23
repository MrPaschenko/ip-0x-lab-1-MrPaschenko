import Foundation

let string = try String(contentsOfFile: "/Users/mrpaschenko/Developer/ip-0x-lab-1-MrPaschenko/lab1/lab1/File.txt", encoding: String.Encoding.utf8)
let array = string.split(separator: "\n")

let numberOfGeneration = array[0]

let size = array[1].split(separator: " ")

var arrayMain:[[Any]] = []

for i in 1...Int(size[1])! {
    arrayMain.append(array[1 + i].map { String($0) })
}

func cellInFuture(line: Int, column: Int, in array: [[Any]]) -> Int {
    let newArray = prepareArray(array)
    var neigboursNum = 0
    
    //Calculate alive neighbours in its array
    if column == 0 {
        neigboursNum += newArray[line][column + 1]
        neigboursNum += newArray[line].last!
    } else if column == (newArray[line].count - 1) {
        neigboursNum += newArray[line][column - 1]
        neigboursNum += newArray[line][0]
    } else {
        neigboursNum += newArray[line][column + 1]
        neigboursNum += newArray[line][column - 1]
    }
    
    //Calculate alive neighbours in array above
    if line == 0 {
        if column == 0 {
            neigboursNum += newArray.last![column]
            neigboursNum += newArray.last![column + 1]
            neigboursNum += newArray.last!.last!
        } else if column == (newArray.last!.count - 1) {
            neigboursNum += newArray.last![column]
            neigboursNum += newArray.last![column - 1]
            neigboursNum += newArray.last![0]
        } else {
            neigboursNum += newArray.last![column]
            neigboursNum += newArray.last![column + 1]
            neigboursNum += newArray.last![column - 1]
        }
    } else {
        if column == 0 {
            neigboursNum += newArray[line - 1][column]
            neigboursNum += newArray[line - 1][column + 1]
            neigboursNum += newArray[line - 1].last!
        } else if column == (newArray[line - 1].count - 1) {
            neigboursNum += newArray[line - 1][column]
            neigboursNum += newArray[line - 1][column - 1]
            neigboursNum += newArray[line - 1][0]
        } else {
            neigboursNum += newArray[line - 1][column]
            neigboursNum += newArray[line - 1][column + 1]
            neigboursNum += newArray[line - 1][column - 1]
        }
    }

    //Calculate alive neighbours in array below
    if line == (newArray.count - 1) {
        if column == 0 {
            neigboursNum += newArray[0][column]
            neigboursNum += newArray[0][column + 1]
            neigboursNum += newArray[0].last!
        } else if column == (newArray[0].count - 1) {
            neigboursNum += newArray[0][column]
            neigboursNum += newArray[0][column - 1]
            neigboursNum += newArray[0][0]
        } else {
            neigboursNum += newArray[0][column]
            neigboursNum += newArray[0][column + 1]
            neigboursNum += newArray[0][column - 1]
        }
    } else {
        if column == 0 {
            neigboursNum += newArray[line + 1][column]
            neigboursNum += newArray[line + 1][column + 1]
            neigboursNum += newArray[line + 1].last!
        } else if column == (newArray[line + 1].count - 1) {
            neigboursNum += newArray[line + 1][column]
            neigboursNum += newArray[line + 1][column - 1]
            neigboursNum += newArray[line + 1][0]
        } else {
            neigboursNum += newArray[line + 1][column]
            neigboursNum += newArray[line + 1][column + 1]
            neigboursNum += newArray[line + 1][column - 1]
        }
    }
    
    var cellInFuture = 0
    if neigboursNum == 2 || neigboursNum == 3 {
        cellInFuture = 1
    }

    return cellInFuture
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

print(cellInFuture(line: 4, column: 1, in: arrayMain))
