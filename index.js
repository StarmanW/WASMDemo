(function () {
    // Variables declaration
    let add,
        num1 = document.querySelector('#num1'),
        num2 = document.querySelector('#num2'),
        addBtn = document.querySelector('#addNumBtn'),
        clearBtn = document.querySelector('#clearBtn'),
        resultOutput = document.querySelector('#resultOutput');

    /**
     * Load WASM file and compile the 
     * wasm byte code. Create a new
     * instance afterwards. 
     * @param {String} filename 
     */
    function loadWasm(filename) {
        return fetch(filename)
            .then(response => response.arrayBuffer())
            .then(bits => WebAssembly.compile(bits))
            .then(module => new WebAssembly.Instance(module));
    };

    /**
     * Performs addition of numbers
     * @param {Object} e 
     */
    function addNumber(e) {
        if (e.target.id === 'addNumBtn' || e.keyCode === 13) {
            num1.focus();
            resultOutput.innerHTML = add(num1.value, num2.value);
        }
    };

    /**
     * Clear inputs
     * @param {Object} e 
     */    
    function clearInput(e) {
        if (e.type === 'click' || e.keyCode === 27) {
            num1.value = 0;
            num2.value = 0;
            resultOutput.innerHTML = 0;
            num1.focus();
        }
    }

    // Load WASM file and attach event listener to HTML elements
    loadWasm('add.wasm')
        .then(instance => {
            // Export the add function
            add = instance.exports._Z3addii;

            // Attach event listener
            document.addEventListener('keydown', clearInput);
            addBtn.addEventListener('click', addNumber);
            clearBtn.addEventListener('click', clearInput);
            num1.addEventListener('keydown', addNumber);
            num2.addEventListener('keydown', addNumber);
        });
})();