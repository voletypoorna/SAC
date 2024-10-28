(function () {
  let template = document.createElement("template");
  template.innerHTML = `
      <style>
        :host {}
  
  /* Style for the container */
  div {
    margin: 50px auto;
    max-width: 600px;
  }
  
  /* Style for the input container */
  .input-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  /* Style for the input field */
  #prompt-input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 70%;
  }
  
  /* Style for the button */
  #generate-button {
    padding: 10px;
    font-size: 16px;
    background-color: #3cb6a9;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 25%;
  }
  
  /* Style for the generated text area */
  #generated-text {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  width:96%;
  }
      </style>
     <div>
  <center>
  <img src="https://1000logos.net/wp-content/uploads/2023/02/ChatGPT-Emblem.png" width="200"/>
  <h1>&J& GenAI</h1></center>
    <div class="input-container">
      <input type="text" id="prompt-input" placeholder="Enter a prompt">
      <button id="generate-button">Generate Text</button>
    </div>
    <textarea id="generated-text" rows="10" cols="50" readonly></ textarea>
  </div>
    `;

  var ENDPOINT = "https://genaiapimna.jnj.com/openai-completion/openai/deployments/gpt-35-turbo-0301/completions?api-version=2023-03-15-preview"
  var apikey = " "
  
  class Widget extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({
        mode: "open"
      });
      shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {};
    }
    async connectedCallback() {
      this.initMain();
    }
    async initMain() {
      const generatedText = this.shadowRoot.getElementById("generated-text");
      generatedText.value = "";
      const {
        apiKey
      } = this._props || "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";
      const {
        max_tokens
      } = this._props || 1024;
      const generateButton = this.shadowRoot.getElementById("generate-button");
      generateButton.addEventListener("click", async () => {
        const promptInput = this.shadowRoot.getElementById("prompt-input");
        const generatedText = this.shadowRoot.getElementById("generated-text");
        generatedText.value = "Finding result...";
        const prompt = promptInput.value;
        const response = await fetch("https://genaiapimna.jnj.com/openai-completion/openai/deployments/gpt-35-turbo-0301/completions?api-version=2023-03-15-preview", 
                                     ;
        var request = require('request');
        var options = {
                    'method': 'POST',
                    'url': ENDPOINT,
          'headers': {
                    'api-key': API_KEY,
                    'Content-Type': 'application/json'
  },
          body: JSON.stringify({
            "prompt": prompt,
            "max_tokens": parseInt(max_tokens),
            "n": 1,
            "temperature": 0.5,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "max_tokens": 60,
            "stop": null
          })
        });

        if (response.status === 200) {
          const {
            choices
          } = await response.json();
          const generatedTextValue = choices[0].text;
          generatedText.value = generatedTextValue.replace(/^\n+/, '');
        } else {
          const error = await response.json();
          alert("GenAI Response: " + error.error.message);
          generatedText.value = "";
        }
      });
    }
    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = {
        ...this._props,
        ...changedProperties
      };
    }
    onCustomWidgetAfterUpdate(changedProperties) {
      this.initMain();
    }
  }
  customElements.define("com-poornavolety-jnj-ChatGptwidget", Widget);
})();
