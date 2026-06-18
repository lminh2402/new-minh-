const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

const html = fs.readFileSync("c:/Users/Dell/Desktop/bản thử uiux/UI-UX-main/login.html", "utf-8");
const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });

dom.window.document.addEventListener("DOMContentLoaded", () => {
    try {
        const scriptCode = fs.readFileSync("c:/Users/Dell/Desktop/bản thử uiux/UI-UX-main/script.js", "utf-8");
        dom.window.eval(scriptCode);
        console.log("Script executed.");
        
        const popover = dom.window.document.getElementById('ai-chat-popover');
        const input = popover.querySelector('input[type="text"]');
        const sendBtn = popover.querySelector('.send-btn');
        
        console.log("Found Input: ", !!input);
        console.log("Found Btn: ", !!sendBtn);
        
        input.value = "Test message";
        sendBtn.click();
        
        console.log("Chat body HTML:", popover.querySelector('.chat-body').innerHTML);
    } catch(e) {
        console.error("Error:", e);
    }
});
