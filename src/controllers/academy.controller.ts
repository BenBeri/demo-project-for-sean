import {Controller, Get, UseGuards} from "@nestjs/common";
import {AuthenticatedUserGuard} from "../guards/authenticated-user.guard";

@Controller('academy')
@UseGuards(AuthenticatedUserGuard)
export class AcademyController {

    /**
     * Dummy method to test that AuthenticatedUserGuard works
     */
    @Get()
    getAcademyDetails(){
        return 'hello word';
    }
}
