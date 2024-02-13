public with sharing class serviceCaseQueueFiltered {

    @AuraEnabled(cacheable=true)
    public static List<Case> getUserCases() {
        // Get the current user's Id
        Id currentUserId = UserInfo.getUserId();

        // Get the queues associated with the current user
        List<GroupMember> userQueues = [SELECT GroupId FROM GroupMember WHERE UserOrGroupId = :currentUserId];

        // Building a set of queue Ids
        Set<Id> queueIds = new Set<Id>();
        for (GroupMember queue : userQueues) {
            queueIds.add(queue.GroupId);
        }

        // Query for cases based on the specified data
        List<Case> cases = [SELECT Id, Subject, OwnerId, Priority, CreatedDate
                            FROM Case
                            WHERE (OwnerId = :currentUserId OR OwnerId IN :queueIds)
                            ORDER BY OwnerId ASC, Priority DESC, CreatedDate DESC
                            LIMIT 25];

        return cases;
    }
}