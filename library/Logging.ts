import chalk from 'chalk';

export class CustomLogger {
    public static log = (args: unknown) => this.info(args)

    public static info = (args: unknown) => {
        console.log(chalk.blue(`[${new Date().toLocaleDateString()}] [INFO]`), chalk.blueBright(args));
    }

    public static warn = (args: unknown) => {
        console.log(chalk.yellow(`[${new Date().toLocaleDateString()}] [WARN]`), chalk.yellowBright(args));
    }

    public static error = (args: unknown) => {
        console.log(chalk.red(`[${new Date().toLocaleDateString()}] [ERROR]`), chalk.redBright(args));
    }
}