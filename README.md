# WebTable
# WebTable
WebTable is a JavaScript widget that allows a table to help manage basic University Student info. It has a variety of features that allows for in-table
editing along with basic hot key functions to allow for faster editing. The file structure of this repository and the features in Javascript are listed in greater detail.

<h1>Files</h1>
Each file in this repository serves a particular use for this JavaScript widget. The individual uses are listed below. To contact the autor regarding these files, please email
<a href="mailto:hashim0131@gmail.com">email me</a>.

<h3>Assets Folder</h3>
The assets folder contains a variety of PNGs, JPEGs, and SVGs that are utilized with the sample website in this repository. These images were designed and exported using Affinity
Designer, a vector graphics application. The files are not intended to be used for personal, commercial, and other type of use without direct consent of the author. If requested,
the .afdesign files can be sent for examination or usage.

<h3>HTML and CSS</h3>
These files are intended to demonstrate the tables usage. All CSS files and the html file home.html demonstrate an example website that uses the table.
The file table.html is intended to be a html file that can be copy and pasted into any other html file so that the javascript widget works directly with another file. 

<h3>JavaScript </h3>
The JavaScript folder contains the table.js file, which contains all the events needed to run the table correcly. The file tableFunctions.js is a collection of helper functions
that table.js uses to do a variety of tasks. These files constitute the table widget and should always be included in a project using WebTable.

<h1>Using WebTable in Your Projects</h3>
To see WebTable work in an example website, simply download the repository as a .zip file and then navigate to the html folder and run home.html in your browser. This should allow
you to see how WebTable works. The Red X's allow for deleting a row (regardless of the operation being performed). To add a row, simply click the add row button and then press
either enter, escape, or the Add Row button to add the row. Press the cancel row button to cancel a row.

To edit a row, simply click on the row. Again, press enter, escape, or the add edit button to add the edit. 

Note that input validation is done. While the JavaScript code does perform sanitization on the input, it should never be relied upon as users can turn of JavaScript. Always validate
on the server-side to ensure data is sanitize. Also note that no fields can be left empty and emails must have an "@" symbol and "." to be considered valid. An error message
displays if none of these conditions are met. The levels field is not validated due to it being a dropdown.

Again, all JavaScript files are for your usage in your projects, along with the file table.html as a basic html file to copy and paste into your html code to use the table. 
They are standalone files.

<h1>Feedback</h1>

WebTable is by no means a complete product. The items listed below are some of the many features current still in development:
* Allowing users to add custom fields
* Allowing more hotkeys for quicker edits
* A dedicated button or hotkey to cancel edits
* Allowing for table saving on server-side and class management
