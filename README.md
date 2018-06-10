# Node.js Discord QuakeServerLookup Bot
A simple Node.js bot that checks specific QuakeWorld server and posts information of it to Discord server it is in. It's not the prettiest code ever, but maybe it can be useful to someone and work as a base, if nothing else. :)

If there are players in the server, it'll look like this:

![alt text](https://i.imgur.com/L7KUK6i.png "Players in server")

Without players, it'll look like this:

![alt text](https://i.imgur.com/CqL6FDQ.png "No players in server")

The bot only updates when the command is used.

If you encounter problems, or the bot complains something about dependencies, please contact me! I'll try to figure what's up.

## Setup

Bot uses Node.js.

To use the bot, user must have role called `Quakemod` and type `!qserver` in any channel the bot is allowed to talk in (that's where role settings come to play). Then, the bot displays information of the server in embed mode. (Bot must be allowed to embed files!)

The role name can be changed from the code directly and the command aswell, if you wish to do so.

For server IP and Port, look for `QUAKESERVERIP` and `QUAKESERVERPORT` in the code and change them to match your Quake server IP and Port.

Also add your server IP and Port to "serveripfull" variable.

That's it really!

## To do

If I ever have time, or if someone else has time, I want to make the bot to delete it's older message before posting a new one. 

Ideally the bot would send message whenever server gets more people, however that could also be annoying to people in chat.

Change changeable things to variables so they're easier to set up. I don't have time to test everything at the moment.

## Dependencies

Discord.js: https://discord.js.org/

Quakeworld node package: https://www.npmjs.com/package/quakeworld



