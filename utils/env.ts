require('dotenv').config()

export default class Env {
    public static readonly API_URL = process.env.BASE_URL!;
    public static readonly USERNAME = process.env.USERNAME!;
    public static readonly PASSWORD = process.env.PASSWORD!;
  }
