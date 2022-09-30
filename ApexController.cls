public class ApexController {
    
    public static void setSessionId(){
        Salesforce_Access_Token__c access = [SELECT Access_Token__c FROM Salesforce_Access_Token__c];
        if(access.Access_Token__c !=  UserInfo.getOrganizationId()+''+UserInfo.getSessionId().SubString(15)){
            access.Access_Token__c = UserInfo.getOrganizationId()+''+UserInfo.getSessionId().SubString(15);
        	update access;    
        }
    }
    
    @AuraEnabled
    public static String getVfURL(){
        String urlStr = Url.getOrgDomainUrl().toExternalForm();
        //urlStr.replace(, '--c.visualforce.com');
        urlStr = urlStr.remove('.my.salesforce.com');
        urlStr += '--c.visualforce.com';
        System.debug(urlStr);
        return urlStr;
    }
    
    @AuraEnabled
    public static void UploadFile(String Name,String contentType, String fileContent){
        System.debug(Name+' '+contentType+' '+fileContent);
        StaticResource.updateRes(Name ,contentType, fileContent);
    }
}