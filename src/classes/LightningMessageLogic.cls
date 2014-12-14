public class LightningMessageLogic {
    @AuraEnabled
    public static List<Conversation> getConversations(){
        ConnectApi.ChatterConversationPage page = ConnectApi.ChatterMessages.getConversations();
        List<Conversation> result = new List<Conversation>();
        for(ConnectApi.ChatterConversationSummary conv : page.conversations) {
            result.add(new Conversation(conv));
        }
        return result;
    }

    @AuraEnabled
    public static List<Message> getConversation(String convId){
        ConnectApi.ChatterConversation page = ConnectApi.ChatterMessages.getConversation(convId);
        List<Message> result = new List<Message>();
        for(ConnectApi.ChatterMessage msg : page.messages.messages) {
            result.add(new Message(msg));
        }
        return result;
    }
    
    @AuraEnabled
    public static List<User> getRecipients(String convId) {
        ConnectApi.ChatterConversation page = ConnectApi.ChatterMessages.getConversation(convId);
		List<User> result = new List<User>();
        for(ConnectApi.UserSummary user : page.members) {
            result.add(new User(user));
        }
        return result;
    }
    
    @AuraEnabled
    public static Message replyToMessage(String text, String msgId) {
        ConnectApi.ChatterMessage msg = ConnectApi.ChatterMessages.replyToMessage(text, msgId);
        return new Message(msg);
    }
    
    @AuraEnabled
    public static Message sendMessage(String text, String recipients) {
        ConnectApi.ChatterMessage msg = ConnectApi.ChatterMessages.sendMessage(text, recipients);
        return new Message(msg);
    }
    
    @AuraEnabled
    public static List<User> getUsers() {
        ConnectApi.UserPage users = ConnectApi.ChatterUsers.getUsers(null);
		List<User> result = new List<User>();
        for(ConnectApi.UserDetail user : users.users) {
            if(UserInfo.getUserId() != user.id) {
            	result.add(new User(user));
            }
        }
        return result;
    }
    
    @AuraEnabled
    public static List<User> searchUsers(String query) {
        ConnectApi.UserPage users = ConnectApi.ChatterUsers.searchUsers(null, query);
		List<User> result = new List<User>();
        for(ConnectApi.UserDetail user : users.users) {
            if(UserInfo.getUserId() != user.id) {
            	result.add(new User(user));
            }
        }
        return result;
    }

    public class User {
        @AuraEnabled
        String id { get; set; }
        @AuraEnabled
        String name { get; set; }
        @AuraEnabled
        String smallPhotoUrl { get; set; }
        @AuraEnabled
        String companyName { get; set; }
        @AuraEnabled
        String title { get; set; }
        
        public User(ConnectApi.User user) {
            this.id = user.id;
            this.name = user.lastName + ' ' + user.firstName;
            this.smallPhotoUrl = user.photo.smallPhotoUrl;
            this.title = user.title;
        }
    }
    
    public class Conversation {
        @AuraEnabled
        String id { get; set; }
        @AuraEnabled
        String recipient { get; set; }
        @AuraEnabled
        String sentDate { get; set; }
        @AuraEnabled
        String message { get; set; }
        @AuraEnabled
        String smallPhotoUrl { get; set; }
        
        public Conversation(ConnectApi.ChatterConversationSummary conv) {
            this.id = conv.id;
            this.recipient = conv.latestMessage.sender.name;
            this.sentDate = conv.latestMessage.sentDate.format('yyyy/MM/dd HH:mm', 'JST');
            this.message = conv.latestMessage.body.text;
            this.smallPhotoUrl = conv.latestMessage.sender.photo.smallPhotoUrl;
        }
    }
    
    public class Message {
        @AuraEnabled
        String id { get; set; }
        @AuraEnabled
        String conversationId { get; set; }
        @AuraEnabled
        String sender { get; set; }
        @AuraEnabled
        String sentDate { get; set; }
        @AuraEnabled
        String message { get; set; }
        @AuraEnabled
        String smallPhotoUrl { get; set; }
        @AuraEnabled
        Boolean isMine { get; set; }
        @AuraEnabled
        List<String> recipients { get; set; }
        
        public Message(ConnectApi.ChatterMessage msg) {
            this.id = msg.id;
            this.conversationId = msg.conversationId;
            this.sender = msg.sender.name;
            this.sentDate = msg.sentDate.format('yyyy/MM/dd HH:mm', 'JST');
            this.message = msg.body.text;
            this.smallPhotoUrl = msg.sender.photo.smallPhotoUrl;
			this.isMine = (UserInfo.getUserId() == msg.sender.id);

            this.recipients = new List<String>();
            if(msg.recipients != null) {
                for(Integer i=0; i<msg.recipients.size(); i++) {
                    this.recipients.add(msg.recipients[i].id);
                }
            }
        }
    }
}