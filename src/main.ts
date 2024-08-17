import { CasesFactory } from "./core/app/factory/cases-factory";
import Registry from "./infra/di/registry";
import "./infra/api/index"

const registry = Registry.getInstance()
registry.provide('factory_usecases', CasesFactory.create())