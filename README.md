# ShutterKey
#### Video Demo:  <https://youtu.be/yWbbFhIIOFQ>
#### Description:
This is a web application written in a flask that parses information about photos posted by the authors on the photo stock marketplace called https://www.shutterstock.com. In particular, it provides photo search by description, dynamically shows the keywords and descriptions of selected photos, and copies the selected keywords to the clipboard.

There is only one page in the web application - the start page, along the path "/", which displays a panel at the top of the page (conditionally, a navigation bar) and a form for entering a request with a button in the main part of the page.

On the navigation bar on the left side, the red and gray ShutterKey is a clickable link that leads to the start page. On the right side, the About button opens a video presentation of the project on YouTube.

In the request form, you must enter a short description of the photo for which you want to find keywords. For example, if you have a cat in your photo, then you just need to enter the word "cat" in the request form and press enter on the keyboard, or click the "Find" button with the mouse. After that, the page design will be slightly supplemented: a panel with keywords management will appear on the left side of the screen, and material will appear on the right side, which returns Shutterstock by API request in the form of photo previews.

If there are no photo previews on the right side of the screen, try changing the request. Shutterstock may not have found anything for you that you requested. Also check your internet connection as this web application needs it to send a request to Shutterstock and get a response.

The maximum number of previews returned from Shutterstock is 100.

For convenience, your previous request remains in the request form, which you may want to supplement or correct.

If you get an answer, pay attention to the following functionality.

Photo block.

1. Each photo is clickable. If you click on it with the left mouse button, the browser will give you a modal window with information on this photo: ID on Shutterstock, description, all keywords, a button to go to it's page on Shutterstock.
2. Under each photo there is a select/deselect button for each individual image. This button changes its design depending on whether it is pressed or not. When an individual image is selected, the image keywords are added to the keyword list on the left side of the screen, in the keyword management box.
3. You can select all photos, or deselect all photos, using the special buttons at the top right of the screen, above all photos.

Block of keywords.

1. The block of keywords consists of buttons for selecting / deselecting all words in the list plus the "copy to clipboard" button, information about the number of keywords in the list and the number of selected keywords, the list of keywords itself.
2. Please note that the list of keywords is dynamic and is updated without reloading the page when you select a photo from the right side of the screen (photo block).
3. The height of the block of keywords is tied either to the height of the photo block, or to the height of the displayed page, if the photo block has a small number of results. If the list is larger than the parameters listed above, it becomes scrollable.
4. The list of keywords is sorted in descending order according to the "number of mentions" column. Information about the number of mentions is also displayed in the list next to each keyword.
5. The "copy to clipboard" button opens a modal window that displays information about the number of copied keywords and a list of these keywords. When you click on the "copy to clipboard" button, all selected keywords are automatically copied to the clipboard as a string, where each keyword is separated by a comma and a space (keyword1, keyword2), without quotes. This way you can immediately paste them into the caption of the photo you want to submit for Shutterstock review in the format Shutterstock requires.