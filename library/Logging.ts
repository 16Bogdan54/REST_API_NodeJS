import chalk from 'chalk';

export default class CustomLogger {
    public static log = (args: unknown) => this.info(args)

    public static info = (args: unknown) => {
        console.log(chalk.blue(`[${new Date().toLocaleDateString()}] [INFO]`), chalk.blueBright(args));
    }

    public static warn = (args: unknown) => {
        console.log(chalk.yellow(`[${new Date().toLocaleDateString()}] [INFO]`), chalk.yellowBright(args));
    }

    public static error = (args: unknown) => {
        console.log(chalk.red(`[${new Date().toLocaleDateString()}] [INFO]`), chalk.redBright(args));
    }
}