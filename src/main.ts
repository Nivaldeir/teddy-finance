import { CasesFactory } from "./core/app/factory/cases-factory";
import Registry from "./infra/di/registry";
import "./infra/api/index";
import { RabbitMQAdapter } from "./infra/queue/adapter/rabbit-mq";
import Queue from "./infra/queue";
async function init() {
  const queue = new RabbitMQAdapter();
  await queue.connect()

  const registry = Registry.getInstance();
  registry.provide("factory_usecases", CasesFactory.create());

  new Queue(queue)
}
init()