// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "fetchData") {
    console.log("fetchData 수행");
    let url = "https://jsonplaceholder.typicode.com/posts/1";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Send the data to the content script
        chrome.tabs.query({}, function(tabs) {
          for (let i = 0; i < tabs.length; i++) {
            chrome.tabs.sendMessage(tabs[i].id, { action: "displayData", data: data });
          }
        });
      })
      .catch(error => console.error(error));
  }
});