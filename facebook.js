const destination_folder = __dirname + "\\extracted_voices";
const directory = "";
const users = [];

const fs = require("fs");
const utf8 = require("utf8");
if (!fs.existsSync(destination_folder)) fs.mkdirSync(destination_folder);
var check_users = [];
for (var i = 0; i < users.length; i++) check_users[users[i]] = true;

var num = 1;
console.log(__dirname + "\\messages\\inbox\\" + directory + "\\message_" + num + ".json");
while (fs.existsSync(__dirname + "\\messages\\inbox\\" + directory + "\\message_" + num + ".json")) {
    console.log("Reading message_" + num + ".json...");
    var data = JSON.parse(fs.readFileSync(__dirname + "\\messages\\inbox\\" + directory + "\\message_" + num + ".json"));
    for (i = 0; i < data.messages.length; i++) {
        var message = data.messages[i];
        if (message.audio_files && check_users[utf8.decode(message.sender_name)]) {
			for (var j = 0; j < message.audio_files.length; j++) {
				var audio = message.audio_files[j], sender = utf8.decode(message.sender_name);
				var time = new Date(audio.creation_timestamp * 1000);
				if (!fs.existsSync(destination_folder + "\\" + sender)) fs.mkdirSync(destination_folder + "\\" + sender);
				var source = __dirname + "\\" + audio.uri.replace("/", "\\").replace("/", "\\").replace("/", "\\").replace("/", "\\").replace("/", "\\"),
					destination = destination_folder + "\\" + sender + "\\" + time.getFullYear().toString() + ('0' + (time.getMonth() + 1).toString()).slice(-2) + ('0' + time.getDate().toString()).slice(-2) + "-" + ('0' + time.getHours().toString()).slice(-2) + ('0' + time.getMinutes().toString()).slice(-2) + ('0' + time.getSeconds().toString()).slice(-2) + ".mp4";
				fs.copyFileSync(source, destination);
				console.log("Extracted " + sender + "'s voice file from " + source + " to " + destination);
			}
		}
    }
    num++;
}