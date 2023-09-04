const TelegramApi = require("node-telegram-bot-api")

const token = "6552983930:AAFG1lpkmB3iNn9_77BqKr9-FFOKubF6Nr8";

const bot = new TelegramApi(token, { polling: true });

const { pairValue, pairValueT, pairValue3, pairValue2, searchText} = require('./test.js');
const { pairValueK, pairValueTK} = require('./reader.js');

const excelTAB = './excelTAB/sptmb.xlsx';

var notes = [];
let startCommandHandled = false;

bot.onText(/Отправь в (.+)/, function (msg, match) {
	var userId = msg.from.id;
	var time = match[1];

	notes.push({ 'uid': userId, 'time': time});

	bot.sendMessage(userId, `Сегодня такие:\n\n${formattedPairs}`);
});

setInterval(function(){
	for (var i = 0; i < notes.length; i++) {
    const curDate = new Date().getHours() + ':' + new Date().getMinutes();
    const formattedPairs = pairValue.join('\n'); // Форматирование каждого элемента массива на отдельной строке
    if (notes[i]['time'] === curDate) {
      bot.sendMessage(notes[i]['uid'],
      bot.sendMessage(chatId, `Сегодня такие:\n\n${formattedPairs}`)
      );
      notes.splice(i, 1);
    }
  }
}, 1000);

bot.on('message', async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  bot.setMyCommands([
    { command: 'Настройки', description: 'Старт меню' },
  ]);

  bot.onText(/сНБо22-1/,(msg) => {
    const chatId = msg.chat.id;
    if (!startCommandHandled) {
      bot.sendMessage(chatId, "Привет, начинай пользоваться :3", {
        "reply_markup": {
          "keyboard": [["Пары сегодня gr-1", "Пары завтра gr-1"], ["Расписание (файл.excel)"], ["Настройки"]],
        }
      });
      startCommandHandled = true;
    }
  
  });
  bot.onText(/сНБо22-2/,(msg) => {
    const chatId = msg.chat.id;
    if (!startCommandHandled) {
      bot.sendMessage(chatId, "Привет, начинай пользоваться :3", {
        "reply_markup": {
          "keyboard": [["Пары сегодня gr-2", "Пары завтра gr-1"], ["Расписание (файл.excel)"], ["Настройки"]],
        }
      });
      startCommandHandled = true;
    }
  
  });
  bot.onText(/сНБо22-3/,(msg) => {
    const chatId = msg.chat.id;
    if (!startCommandHandled) {
      bot.sendMessage(chatId, "Привет, начинай пользоваться :3", {
        "reply_markup": {
          "keyboard": [["Пары сегодня gr-3", "Пары завтра gr-1"], ["Расписание (файл.excel)"], ["Настройки"]],
        }
      });
      startCommandHandled = true;
    }
  
  });
  bot.onText(/сНБо22-К/,(msg) => {
    const chatId = msg.chat.id;
    if (!startCommandHandled) {
      bot.sendMessage(chatId, "Привет, начинай пользоваться :3", {
        "reply_markup": {
          "keyboard": [["Пары сегодня k", "Пары завтра k"], ["Расписание (файл.excel)"], ["Настройки"]],
        }
      });
      startCommandHandled = true;
    }
  
  });
  bot.onText(/Настройки/, (msg) => {
    const chatId = msg.chat.id;
    if (startCommandHandled) {
      bot.sendMessage(chatId, "Привет, выбери группу", {
        "reply_markup": {
          "keyboard": [["сНБо22-1","сНБо22-2", "сНБо22-3"], ["сНБо22-К"]]
        }
      });
      startCommandHandled = false; // Сбрасываем флаг, чтобы команда "Настройки" снова стала доступной для вызова
    }
    
  });
  
  if (text === "Пары сегодня gr-1") {
    const formattedPairs = pairValue.join('\n');
    bot.sendMessage(chatId, `Сегодня "${searchText}" такие:\n\n${formattedPairs}`)
  }
  if (text === "Пары завтра gr-1") {
    const formattedPairs = pairValueT.join('\n');
    bot.sendMessage(chatId, `Завтра такие\n\n${formattedPairs}`)
  }
  if (text === "Расписание (файл.excel)") {
    bot.sendMessage(chatId, "Вот файлик :3");
    bot.sendDocument(chatId, excelTAB);
  }  
  if (text === "Настройки") {
    startCommandHandled = true; // Устанавливаем флаг, чтобы предотвратить повторное выполнение команды до следующего вызова команды
  }
  if (text === "Пары сегодня gr-2") {
    const formattedPairs = pairValue2.join('\n');
    bot.sendMessage(chatId, `Сегодня "${searchText}" такие:\n\n${formattedPairs}`)
  }
  if (text === "Пары сегодня gr-3") {
    const formattedPairs = pairValue3.join('\n');
    bot.sendMessage(chatId, `Сегодня "${searchText}" такие:\n\n${formattedPairs}`)
  }
  if (text === "Пары сегодня k") {
    const formattedPairs = pairValueK.join('\n');
    bot.sendMessage(chatId, `Сегодня "${searchText}" такие:\n\n${formattedPairs}`)
  }
  if (text === "Пары завтра k") {
    const formattedPairs = pairValueTK.join('\n');
    bot.sendMessage(chatId, `Завтра такие\n\n${formattedPairs}`)
  }
});
