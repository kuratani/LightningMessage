({
	doInit : function(component, event, helper) {
		helper.getCoversations(component);
		helper.getCommunities(component);
	},

    doShowMessageList : function(component, event, helper) {
        var target = event.target;
        for(var i=0; i<5; i++) {
            if(target.id) break;
            target = target.parentNode;
        }
        component.set("v.currentPage", "MessageList");
        component.set("v.conversationId", target.id);
        helper.getConversation(component, target.id);
	},
    
    doShowSearchUser : function(component, event, helper) {
        component.set("v.members", null);
        component.set("v.memberNum", 0);
        component.set("v.users", null);
        component.set("v.userNum", 0);
		component.set("v.currentPage", "SearchUser");
        helper.getUsers(component);
	},
    
    doShowRecipients : function(component, event, helper) {
        
		component.set("v.currentPage", "ShowRecipients");
		helper.getRecipients(component);
	},
    
    doBackConversationList : function(component, event, helper) {
        component.set("v.conversations", null);
        component.set("v.messages", null);
		component.set("v.currentPage", "ConversationList");
		helper.getCoversations(component);
    },
    
    doBackNewConversation : function(component, event, helper) {
        component.set("v.users", null);
        component.set("v.query", null);
		component.set("v.currentPage", "NewConversation");
    },
    
    doBackMessageList : function(component, event, helper) {
        component.set("v.recipients", null);
		component.set("v.currentPage", "MessageList");
    },
    
    doGetUser : function(component, event, helper) {
		component.set("v.currentPage", "SearchUser");
        component.set("v.users", null);
        component.set("v.userNum", 0);
		helper.getUsers(component);
    },
    
    doSearchUser : function(component, event, helper) {
        var query = component.get("v.query");
        component.set("v.users", null);
        component.set("v.userNum", 0);
		helper.searchUsers(component, query);
    },
    
    doAddUser : function(component, event, helper) {
        var target = event.target;
        for(var i=0; i<5; i++) {
            if(target.id) break;
            target = target.parentNode;
        }
        var users = component.get("v.users");
        var members = component.get("v.members");
        for(var i=0; i<users.length; i++) {
            if(users[i].id == target.id) {
                members.push(users[i]);
            }
        }
        component.set("v.users", null);
        component.set("v.members", members);
        component.set("v.memberNum", members.length);
		component.set("v.currentPage", "NewConversation");
    },
    
    doReplyToMessage : function(component, event, helper) {
        var element = component.find("message").getElement();
        var text = element.value;
		helper.replyToMessage(component, text);
        element.value = "";
    },
    
    doSendMessageNew : function(component, event, helper) {
        var members = component.get("v.members");
        var membersCsv = members[0].id;
        for(var i=1; i<members.length; i++) {
            membersCsv += members[i].id;
        }
        var element = component.find("newMessage").getElement();
        var text = element.value;
		helper.sendMessage(component, text, membersCsv);
        element.value = "";
    },
    
	waiting : function(component, event, helper) {
        var page = component.get("v.currentPage");
		$A.util.addClass(component.find("waiting" + page).getElement(), "waiting");
	},

	doneWaiting : function(component, event, helper) {
        var page = component.get("v.currentPage");
		$A.util.removeClass(component.find("waiting" + page).getElement(), "waiting");
	}
})