import { CasesFactory } from "./core/app/factory/cases-factory";
import Registry from "./infra/di/registry";
import "./infra/cluster/index"

const registry = Registry.getInstance()
registry.provide('factory_usecases', CasesFactory.create())