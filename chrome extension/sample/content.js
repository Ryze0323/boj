// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "displayData") {
    let data = request.data;
    // Display the data on the page
    console.log("displayData 수행");
    alert(JSON.stringify(data));
    sendResponse('')
  }
});