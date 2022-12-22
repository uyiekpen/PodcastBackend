import { google } from "googleapis";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const GOOGLE_SECRET = "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";

const CLIENT_ID =
  "129117362352-e5s2a330hsh7n5o7d4cur5k445k2i5mm.apps.googleusercontent.com";

const RefreshToken =
  "1//049ifd0CiXoPrCgYIARAAGAQSNwF-L9IrnKlBOcelDrQ92gBHa22WX4487z8jIPfcUCsX6Hyul6G503aeIuGVbuTJai3s4w-lPso";

const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_SECRET, CLIENT_ID, GOOGLE_REDIRECT);

oAuth.setCredentials({ refresh_token: RefreshToken });

export const verifiedAccount = async (email: string, username: string) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "olorundasamuel2@gmail.com",
        refreshToken: accessToken.token,
        clientId: CLIENT_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: RefreshToken,
      },
    });
    const file = path.join(__dirname, "../views/mail.ejs");

    const data = await ejs.renderFile(file, {
      username: username,
    });

    const mainOptions = {
      from: "Podcast <tribinnov.talent@gmail.com>",
      to: email,
      subject: "Account verification",
      html: data,
    };

    transporter.sendMail(mainOptions, () => {
      console.log(`mail sent successfully`);
    });
  } catch (error) {
    return error;
  }
};
