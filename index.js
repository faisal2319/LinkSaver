let Leads = []
const input_el = document.getElementById("input-el")
const input_button = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const delete_button = document.getElementById("delete-btn")
const localStorageLeads = JSON.parse( localStorage.getItem("myLeads") )
const tab_button = document.getElementById("tab-btn")

if (localStorageLeads) {
    Leads = localStorageLeads
    render(Leads)
}

tab_button.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        Leads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(Leads) )
        render(Leads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

delete_button.addEventListener("dblclick", function() {
    localStorage.clear()
    Leads = []
    render(Leads)
})

input_button.addEventListener("click", function() {
    Leads.push(input_el.value)
    input_el.value = ""
    localStorage.setItem("myLeads", JSON.stringify(Leads) )
    render(Leads)
})