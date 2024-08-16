import { CasesFactory } from "./core/app/factory/cases-factory";
import "./infra/api";
import Registry from "./infra/di/registry";

const registry = Registry.getInstance()
registry.provide('factory_usecases', CasesFactory.create())