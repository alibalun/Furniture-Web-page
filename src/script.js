const furnitureSpanContainer = document.querySelectorAll("#furniture-input-container input");

// This class is created only #furniture-input-container 's parent
class CustomizationSelection {
    static fsContainer = document.querySelector("#furniture-span-container");
    static containerControl(item) {
        if (item.id == "sehpa") {
            CustomizationSelection.fsContainer.style.marginLeft = "0px";
        }
        else if (item.id == "koltuk") {
            CustomizationSelection.fsContainer.style.marginLeft = "90px";
        }
        else if (item.id == "baza") {
            CustomizationSelection.fsContainer.style.marginLeft = "180px";
        }
    }
}

// Accesing every input items inside of #furniture-input-container
furnitureSpanContainer.forEach((item) => {
    item.addEventListener("click", (e) => {
        CustomizationSelection.containerControl(e.target);
        SelectionArea.containerControl(e.target);
    });
});

// Access children of #wood-s-container' item
const woodContainer = document.querySelectorAll("#wood-s-container span");

// This class created for getting data from JSON server and calculate price(total/item)
class Amount {

    // It stores every item's cost on the every section area
    static totalAmountArr = [];
    // It stores total amount 
    static totalAmount = 0;
    constructor(outItem) {
        // Declare here this.amount variable for price of every item
        this.amount = 0;
        // outItem cames from TreeType 
        this.outItem = outItem;
        this.fetchDataJSON();
    }

    // Fetches data from JSON and send them to forEachAlItems() function
    fetchDataJSON() {
        fetch("./src/items.json")
            .then((response) => response.json())
            .then((data) => {
                this.forEachAllItems(data.items[0].sehpa.sehpaSayisi, 0);
                this.forEachAllItems(data.items[0].sehpa.agacTuru, 1);
                this.forEachAllItems(data.items[0].sehpa.renk, 2);

                this.forEachAllItems(data.items[1].koltuk.agacTuru, 0);
                this.forEachAllItems(data.items[1].koltuk.kumasCinsi, 1);
                this.forEachAllItems(data.items[1].koltuk.kumasRengi, 2);

                this.forEachAllItems(data.items[2].baza.bazaTuru, 0);
                this.forEachAllItems(data.items[2].baza.bazaCinsi, 1);
                this.forEachAllItems(data.items[2].baza.yay, 2);

            });
    }

    // Gets every item from JSON and travelling them for send to an array
    forEachAllItems(outItem, counter) {
        outItem.forEach((oFItem) => {
            // console.log(item);
            // console.log(outItem);
            this.outItem.forEach((item) => {
                item.addEventListener("click", (e) => {
                    // console.log("e.target.textContent" + e.target.textContent);
                    // console.log("oFItem : " + oFItem);
                    if (e.target.textContent == oFItem[0]) {
                        this.amount = oFItem[1];
                        Amount.totalAmountArr[counter] = this.amount;
                        this.sumAllItems(Amount.totalAmountArr);
                        // console.log("Total amount arr : " + Amount.totalAmountArr[counter]);
                        // console.log("Total amount : " + Amount.totalAmount);
                    }
                });
            });
        });
        // console.log("Total amount : " + Amount.totalAmount);
    }

    // It sums all items on the array
    sumAllItems(arr) {
        Amount.totalAmount = 0;
        arr.forEach((item) => {
            Amount.totalAmount += item;
        });
        this.changeCostCircle();
    }

    // It is changin circle position with this method and animation
    changeCostCircle() {
        const circle = document.querySelector("#cost-item .cost-circle");
        circle.style.marginLeft = Amount.totalAmount / 30 + "px";
        this.writeCostToDiv();
    }

    // This method write Total amount to div
    writeCostToDiv() {
        const totalAmountDiv = document.querySelector("#total-amount-div span");
        totalAmountDiv.innerText = Amount.totalAmount + " TL";
        Amount.totalAmount = 0;
    }
}

// This class created for every items on selection area(Customize section)
class TreeType extends Amount {
    constructor(outItem) {
        super(outItem);
        this.getContainer(outItem);
        this.outItem = outItem;
    }
    // Initialize program
    getContainer = (outItem) => {
        this.eLForAllItem(outItem);
    }

    // Firstly we are clearing every item and adding to transparent all of them
    clearAllItems = (e) => {
        this.outItem.forEach((item) => {
            item.classList.remove("border-slate-200");
            item.classList.add("border-transparent");
        });
    }

    // This function is called from every item that affects from event listener
    callBack = (e) => {
        this.clearAllItems(e);

        // It removes border-transparent and adds border-slate-200 class for select an item
        e.target.classList.remove("border-transparent");
        e.target.classList.add("border-slate-200");
    }

    // Event listener for all items
    eLForAllItem(outItem) {
        // Adding event listeners to every children for #wood-s-container
        outItem.forEach((item) => {
            item.addEventListener("click", this.callBack);
        });
    }
}

var type = new TreeType(woodContainer);
var cloth = new TreeType(document.querySelectorAll("#cloth-s-container span"));
var colors = new TreeType(document.querySelectorAll("#color-s-container span"));

var bType = new TreeType(document.querySelectorAll("#bed-type span"));
var bSpec = new TreeType(document.querySelectorAll("#bed-spec span"));
var bBow = new TreeType(document.querySelectorAll("#bed-bow span"));

// This class is created for selection-area
class SelectionArea {
    static selectionArea = document.querySelector("#selection-area");
    constructor(item) {
        SelectionArea.containerControl(item);
    }
    static containerControl(item) {
        if (item.id == "sehpa") {
            SelectionArea.selectionArea.style.marginLeft = "200vw";
        }
        else if (item.id == "koltuk") {
            SelectionArea.selectionArea.style.marginLeft = "0vw";
        }
        else if (item.id == "baza") {
            SelectionArea.selectionArea.style.marginLeft = "-200vw";
        }
    }
}