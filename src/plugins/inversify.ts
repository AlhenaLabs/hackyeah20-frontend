import 'reflect-metadata';
import {Container} from 'inversify';
import {ServicesEnum} from "@/enums/ServicesEnum";
import {AuthService} from "@/services/AuthService";
import {TenantsService} from "@/services/TenantsService";
import {TenantsDeletionsService} from "@/services/TenantsDeletionsService";

const container = new Container();

container.bind<AuthService>(ServicesEnum.AUTH_SERVICE).to(AuthService);
container.bind<TenantsService>(ServicesEnum.TENANTS_SERVICE).to(TenantsService);
container.bind<TenantsDeletionsService>(ServicesEnum.TENANTS_DELETIONS_SERVICE).to(TenantsDeletionsService);

export default container;