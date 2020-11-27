import 'reflect-metadata';
import {ServicesEnum} from "@/enums/ServicesEnum";
import {AuthService} from "@/services/AuthService";
import {UserService} from "@/services/UserService";
import {Container} from "inversify";

const container = new Container();

container.bind<AuthService>(ServicesEnum.AUTH_SERVICE).to(AuthService);
container.bind<UserService>(ServicesEnum.USER_SERVICE).to(UserService);

export default container;