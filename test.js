//токен "6333961639:AAGg7ClRB50AA7VQaO12Nd90je-KAS3xuTE"
const XLSX = require('xlsx');

const workbook = XLSX.readFile('./excelTAB/sptmb.xlsx');


const currentDate = new Date();

const year = currentDate.getFullYear().toString().slice(2);
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');


const searchText = `${day}.${month}.${year}`;

let cellFound = false;
let foundCellAddress;
let pairsArray = [];

const pairValue = [];
const pairValue2 = [];
const pairValue3 = [];
const pairValueT = [];


for (const sheetName of workbook.SheetNames) {
  const worksheet = workbook.Sheets[sheetName];
  const range = XLSX.utils.decode_range(worksheet['!ref']);

  for (let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex++) {
    for (let colIndex = range.s.c; colIndex <= range.e.c; colIndex++) {
      const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
      const cell = worksheet[cellAddress];

      if (cell && cell.v !== undefined && typeof cell.v === 'string') {
        const cellValue = cell.v;
        const regex = new RegExp(searchText, 'i');

        if (regex.test(cellValue)) {
          cellFound = true;
          foundCellAddress = cellAddress;
          
          const lastcol = rowIndex + 6;

          for (let i = rowIndex; i < lastcol; i++) {
            //Лекция сегодня и время сегодня координаты по х
            const lectia = colIndex + 2;
            const timel = colIndex + 1;
            //Лекция сегодня и время сегодня координаты точные
            const less = XLSX.utils.encode_cell({ r: i, c: lectia });
            const timelectia = XLSX.utils.encode_cell({ r: i, c: timel });
            //По У координаты завтрашних
            const tomorow = i+6;
            //Лекция завтра точные координаты
            const lessT = XLSX.utils.encode_cell({ r: tomorow, c: lectia });
            const timelectiaT = XLSX.utils.encode_cell({ r: tomorow, c: timel });
            
            const cell = worksheet[less];
            const cellValue = cell && cell.v ? cell.v : '1';  

            const timing = worksheet[timelectia];
            const timeif = timing && timing.v ? timing.v : '1';    

            const cellT = worksheet[lessT];
            const cellValueT = cellT && cellT.v ? cellT.v : '1'; 
            
            const timingT = worksheet[timelectiaT];
            const timeifT = timingT && timingT.v ? timingT.v : '1';    
            const group2 = lectia+1;
            //время тоже, что у сегодняшних т е timel
            const lessgroup2 = XLSX.utils.encode_cell({ r: i, c: group2 });
            //время тоже, что у сегодняшних timelectia
            const group2now = worksheet[lessgroup2];
            const goup2rule = group2now && group2now.v ? group2now.v : '1';

            const group3 = lectia+2;
            //время тоже, что у сегодняшних т е timel
            const lessgroup3 = XLSX.utils.encode_cell({ r: i, c: group3 });
            //время тоже, что у сегодняшних timelectia
            const group3now = worksheet[lessgroup3];
            const goup3rule = group3now && group3now.v ? group3now.v : '1'; 
            
            if (goup3rule == 1) {
              
            } else {
              const pairValueString = `${timeif}:  ${goup3rule}`;
              const cleanedPairValue = pairValueString.replace(/[\r\n]+/g, '');
              pairValue3.push(cleanedPairValue);
            }

            if (goup2rule == 1) {
              
            } else {
              const pairValueString = `${timeif}: ${goup2rule}`;
              const cleanedPairValue = pairValueString.replace(/[\r\n]+/g, '');
              pairValue2.push(cleanedPairValue);
            }
            if(cellValueT == 1){
            }else{
              const pairValueTString = `${timeifT}: ${cellValueT}`;
              const cleanedPairValueT = pairValueTString.replace(/[\r\n]+/g, ''); // Очистка от \r\n
              pairValueT.push(cleanedPairValueT);
            };
            if(cellValue == 1){
                
            }else{
                const pairValueString = `${timeif}: ${cellValue}`;
                const cleanedPairValue = pairValueString.replace(/[\r\n]+/g, '');
                pairValue.push(cleanedPairValue);
            };
          };
          break;
        }
      }
    }

    if (cellFound) {
      break;
    }
  }

  if (cellFound) {
    break;
  }
}
if (pairValue3.length === 0) {
  pairValue3.push(...pairValue)
}
let test = pairValue2;
let test2 = pairValue;

if(pairValue2==pairValue){
  if(test.splice(0, 1)==test2.splice(0, 1)){
  
  }else{
    pairValue2.splice(0, 1)
  };
};

if (pairValue2.length === 0) {
  pairValue2.push(...pairValue);
}

module.exports = { pairValue, pairValueT, pairValue2, pairValue3, searchText};
