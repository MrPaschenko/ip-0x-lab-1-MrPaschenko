import Foundation

let string = try String(contentsOfFile: "/Users/mrpaschenko/Developer/ip-0x-lab-1-MrPaschenko/lab1/lab1/File.txt", encoding: String.Encoding.utf8)
let array = string.split(separator: "\n")

let numberOfGeneration = array[0]

let size = array[1].split(separator: " ")

var arrayMain:[[Any]] = []

for i in 1...Int(size[1])! {
    arrayMain.append(array[1 + i].map { String($0) })
}

print(arrayMain[0])
