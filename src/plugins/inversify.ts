import 'reflect-metadata';
import {ServicesEnum} from "@/enums/ServicesEnum";
import {AuthService} from "@/services/AuthService";
import {Container} from "inversify";

const container = new Container();

container.bind<AuthService>(ServicesEnum.AUTH_SERVICE).to(AuthService);

export default container;