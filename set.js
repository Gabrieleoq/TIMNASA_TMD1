const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0ZWQi92R2NwZENweDBTSGRsTGZ3d0RGOWNXSkxvaDdmREZkYWY2SjFWTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZXRaT3EvZ1pZZFB1VnEzN2Uyc1VxcUtYTlM4Zzh0VWtXK3hRR3lNUHZIST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyRzBNK2laSWdpUmszb3JIbElTUGtBQmlEUlJKNUdSVjNyRUp3YmJBQ1djPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSZTVacE05TGRBSmxydllnaGFzOThBLzNaT2UrdUo4d01XN0Y1QWRDUGhjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFDWEc0UDNjeTlJbEIzUjU5UDVLcERtMVNGaytpVUNOcm0xQjBORWMya1U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZacW90SDNtV3NqYW9uSVlPZUgyYjhuaHJaRkh0TitHVUZsQmlKUWE4azA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkVIdnVhOFVZQ245c1I3bkNZS29ZLytOa1ByRkoyMnhhT3o3MURZMkJuOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQnVZQzZjbjU5cGxQRXNJRElSSnJIaCtzOTVxU1g1OFRRbDBBcTMvdk15ND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJwS01FYkNVMThOR1dHOW5JUmd3NUhyM1EzZ1lFRTE5OWJVb3JaNFE2bElLQUN3YnBUUExuWFFHdXJtbHpRUDBIR0hJbTRNajl1dk9KZ0NmdEVTWkFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAyLCJhZHZTZWNyZXRLZXkiOiJaY1A4eGRLNlZJNWpIT00yWVVMN3A2dXZBN2dUSmorYjArQTVoWUppZlVvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJhSTJ6NGlmY1FST1VvWU92aWVJRlVBIiwicGhvbmVJZCI6IjM3Y2RmYTc5LThhYTUtNDAyNy1iMTVjLWQ3N2JhOWNkNDc2NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaUWNXYUFxOWprVnM4RldtMnR3SjNnR2wySjA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR3RZNHlMOWtXUmRDR1BlcDB1ZE1UbHVmcFVrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjVOWk45UlExIiwibWUiOnsiaWQiOiI0MDc3MTA0ODE4NTo4MkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSlNYOE5BR0VPMnlnYjRHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWUV1ZEFOY1psT1EycUh6Ry9LZFZnUytDS0dNVVl0SWpyeFgyaUFNOW94WT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSk5ocUh1bEd0REpzOGxGcmsrckJNRkRjMFdQbDExRStKVlJCY2RjZlpqU3FERkxCSFQ0alJMVlJiZlNGWTNMVDl2YUhSUjdBWUZJY0RlZzZXVU82QVE9PSIsImRldmljZVNpZ25hdHVyZSI6Ilc3M3BFYkQybWRxenVQWE5GSDRXZkFQQ0RGSi9TRnZBKzI5bTFNSUZlcXBHMXhNeEFDWnBPdkZZWXNEK09NQ3VLbXlzYTZFNXdWQnduOWhwa3hERkJBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDA3NzEwNDgxODU6ODJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV0JMblFEWEdaVGtOcWg4eHZ5blZZRXZnaWhqRkdMU0k2OFY5b2dEUGFNVyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MDY1OTA2N30=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "TIMNASA-TMD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "400771048185",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    TIMNASA_TMD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
