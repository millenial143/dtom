# DTOM-bot
Небольшой дискорд бот на JS и mySQL.


# Особенности
* Новые возможности для модерации. 
* Уникальные функции которые добавят веселья любому серверу!
* Настройки под любой сервер


# Устанока
Вы можете добавить бота на свой сервер по этой [ссылке](https://discordapp.com/api/oauth2/authorize?client_id=705786467640803358&permissions=262143&scope=bot) или использовать его сами! Для этого следуйте иструкции ниже:
* Для начала скопируйте репозитoрий

    ```
    git clone https://github.com/millenial143/dtom.git
    ```
* Затем в папке dtom запустите

    ```
    npm install
    ```
Для того что бы установить все зависимости (для этого должен быть установлен node js)
  
  # Первоначальная настройка
  Откройте файл DTOM-config.json 


    {
        "token": "ENTER_YOUR_TOKEN",
        "phrases_mp3_files": "./mp3_files/phrases",
        "hello_mp3_files": "./mp3_files/hello",
        "commands":{
            "draw": {
                "inscriptionFolder": "inscription-styles"
            }
        },
        "hook_color":{
            "fun":"#DC6AA7",
            "settings":"#D4C640",
            "blue":"#4BA1EC",
            "green":"#55D440",
            "red": "#D44045"
	    }
    }

    
   Замените надпись ENTER_YOUR_TOKEN на ваш токен, получить его можно [здесь](https://discord.com/developers/applications)
    
   Так же вы можете изменить цвета вебхуков используемых ботом в "hook_color"
   
   ```
   const mysqlConnection = mysql.createConnection({
		host: "localhost",
		user: "root",
		database: "YOUR_DB",
		password: "root"
	});
```
   Так же для полноценного функционирования бота вам понадобится база данных mySQL, параметры базы данных можно изменить в файле index.js
   
   О других настройках и командах бы можете прочить [здесь](https://drive.google.com/file/d/1ZhNWDVWm4XmUuD2cTX_s_5Monh20oHB8/view?usp=sharing)
   
   # Обратная связь
   Сообщения о неисправностях а так же предложения по улучшению бота просьба направлять сюда: amut.besp@gmail.com
    
    
    
    
    
    
    
    
    
    
    
    
    
    
