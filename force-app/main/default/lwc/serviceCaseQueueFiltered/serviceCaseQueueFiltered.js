import { LightningElement, wire } from 'lwc';
import getUserCases from '@salesforce/apex/ServiceCaseQueueService.getUserCases';

export default class CaseQueueTable extends LightningElement {
    caseData;
    showSuccessToast = false;
    showErrorToast = false;

    @wire(getUserCases)
    wiredCases({ error, data }) {
        if (data) {
            this.caseData = data;
        } else if (error) {
            console.error(error);
        }
    }

    columns = [
        { label: 'Case Number', fieldName: 'CaseNumber', type: 'text', sortable: true, hideDefaultActions: true,
            cellAttributes: { iconName: 'standard:case', iconPosition: 'left' },
            typeAttributes: { clickable: true, target: '_blank' }
        },
        { label: 'Status', fieldName: 'Status', type: 'text', sortable: true, editable: true },
        { label: 'Priority', fieldName: 'Priority', type: 'text', sortable: true },
        { label: 'Created Date', fieldName: 'CreatedDate', type: 'date', sortable: true }
    ];

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        if (actionName === 'edit_status') {
            // Need to add logic there...
            this.handleRefresh();
        }
    }

    handleRefresh() {
        // Reload the table content by refreshing the wired data
        this.showSuccessToast = true;
        this.showErrorToast = false;
        return refreshApex(this.wiredCases);
    }
}