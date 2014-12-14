({
    getCoversations : function(component) {
        var action = component.get("c.getConversations");
        action.setCallback(this, function(a) {
            component.set("v.conversations", a.getReturnValue());
        });
        $A.enqueueAction(action);        
    },
    
    getConversation : function(component, convId) {
        var action = component.get("c.getConversation");
        action.setParams({
            "convId": convId
        });
        action.setCallback(this, function(a) {
            component.set("v.messages", a.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    
    getRecipients : function(component) {
        var convId = component.get("v.conversationId");
        var action = component.get("c.getRecipients");
        action.setParams({
            "convId": convId
        });
        action.setCallback(this, function(a) {
            component.set("v.recipients", a.getReturnValue());
            component.set("v.recipientNum", a.getReturnValue().length);
        });
        $A.enqueueAction(action);
    },
    
    getUsers : function(component) {
        var members = component.get("v.members");
        var action = component.get("c.getUsers");
        action.setCallback(this, function(a) {
            var users = a.getReturnValue();
            for(var i=0; i<users.length; i++) {
                for(var j=0; j<members.length; j++) {
                    if(users.id == members.id) {
                        users.splice(i, 1);
                    }
                }
            }
            component.set("v.users", users);
            component.set("v.userNum", users.length);
        });
        $A.enqueueAction(action);
    },
    
    searchUsers : function(component, query) {
        var action = component.get("c.searchUsers");
        action.setParams({
            "query": query
        });
        action.setCallback(this, function(a) {
            component.set("v.users", a.getReturnValue());
            component.set("v.userNum", a.getReturnValue().length)
        });
        $A.enqueueAction(action);
    },
    
    replyToMessage : function(component, text) {
		var messages = component.get("v.messages");
        component.set("v.messages", null);

        var action = component.get("c.replyToMessage");
        action.setParams({
            "text": text,
            "msgId": messages[0].id
        });
        action.setCallback(this, function(a) {
            var msg = a.getReturnValue();
            messages.unshift(msg);
            component.set("v.messages", messages);
        });
        $A.enqueueAction(action);
    },
    
    sendMessage : function(component, text, recipients) {
		var messages = component.get("v.messages");
        component.set("v.messages", null);
        
        var action = component.get("c.sendMessage");
        action.setParams({
            "text": text,
            "recipients": recipients
        });
        action.setCallback(this, function(a) {
            var msg = a.getReturnValue();
            component.set("v.conversationId", msg.conversationId);
			component.set("v.currentPage", "MessageList");
        	this.getConversation(component, msg.conversationId);
        });
        $A.enqueueAction(action);
    }

})
