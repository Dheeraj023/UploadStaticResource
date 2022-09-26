({	
    handleFilesChange : function(component, event)
    {
        console.log("comonent called");
        console.log(component.get("v.fileList")[0]);
        //let firstFile = component.get("v.fileList")[0];
        let firstFile = event.getSource().get("v.files")[0];
        console.log(firstFile);
        var action  = component.get('c.UploadFile');
        console.log(getBase64(firstFile[0]))
        
        function getBase64(file) 
        {
            console.log(file);
            console.log(file.name);
            console.log(file.type);
            //return new Promise((resolve) => {
            var reader = new FileReader();
            console.log(reader);
            console.log(reader.result);
            reader.onloadend =()=>{
                console.log(reader.result.split(',')[1]);
                action.setParams({
                    Name: "CSSImage",
                    contentType: file.type,
                    fileContent : reader.result.split(',')[1]
                });
                action.setCallback(this, function(response){
                    let state = response.getState();
                    if(state === "SUCCESS"){
                        console.log("File Uploaded to apex function");
                        let oiframe = component.find('vfFrame').getElement();
                        console.log(oiframe.getAttribute("src"));
                        oiframe.setAttribute("src", oiframe.getAttribute("src"));	// Reload
                    }
                });
                $A.enqueueAction(action);   
            }
            reader.readAsDataURL(file);
        }
        
    },
    
    doInit : function(component, event, helper) {
        let action = component.get("c.getVfURL");
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.vfURL", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
       
    handleExit : function(component, event, helper) {
        $A.get("e.force:closeQuickAction").fire();
    }

})
