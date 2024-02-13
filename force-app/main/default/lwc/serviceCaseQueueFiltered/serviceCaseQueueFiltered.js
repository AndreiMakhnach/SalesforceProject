import { LightningElement} from 'lwc';
import getUserCases from 'force-app/ServiceCaseQueueFiltered.getUserCases';

export default class ServiceCaseQueueFiltered extends LightningElement {
    //Need to fix proper import there
    //@wire(getUserCases)
    cases;
}