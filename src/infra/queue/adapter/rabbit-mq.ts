import amqp from "amqplib";
import IQueue from "../queue";
import Logger from "../../logger";
export class RabbitMQAdapter implements IQueue {
  app: amqp.Connection;
  async connect(): Promise<void> {
    const url = process.env.RABBIT_MQ_HOST || "amqp://localhost";
    try {
      this.app = await amqp.connect(url);
    } catch (err: any) {
      Logger.instance.error(`Failed to connect to RabbitMQ: ${err.message}`);
      throw err;
    }
  }
  async consume(queueName: string, callback: Function): Promise<void> {
    const channel = await this.app.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, async (msg: any) => {
      const input = JSON.parse(msg.content.toString());
      try {
        await callback(input);
        channel.ack(msg);
      } catch (err: any) {
        Logger.instance.error(err.message);
      }
    });
  }
}
