export default interface IQueue {
  connect(): Promise<void>
  consume(queueName: string, callback: Function): Promise<void>
}
