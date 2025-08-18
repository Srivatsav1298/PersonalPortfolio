var tablinks = document.getElementsByClassName("tab-links")
var tabcontents = document.getElementsByClassName("tab-contents")

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link"); //removes the redlines under each tab of about page
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab"); //removes the contents under each tab of about page
    }
    event.currentTarget.classList.add("active-link") // displays the red line under each tab of about page
    document.getElementById(tabname).classList.add("active-tab") //displays the contents under each tab of about page
}