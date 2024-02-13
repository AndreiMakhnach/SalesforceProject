public without sharing class AccountCasesPdfCtrl {
    
    public List<Case> getAccountCasesPrevWeek() {
        Date startDate = Date.today().toStartOfWeek().addDays(-7);
        Date endDate = Date.today().toStartOfWeek().addDays(-1);

        return [
            SELECT Account.Name,
                   Account.Owner.Name,
                   CaseNumber,
                   Status,
                   Priority,
                   Origin
            FROM Case
            WHERE CreatedDate >= :startDate AND CreatedDate <= :endDate
            ORDER BY Account.Name
        ];
    }
}