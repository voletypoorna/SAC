***********************JSON******************************************
{
    "id": "com.poornavolety.jnj.GenAIwidget",
    "version": "1.0.0",
    "name": "GenAI Widget ",
    "description": "GenAI Custom Widget for SAP Analytics Cloud, To make your application more useful and effective.",
    "newInstancePrefix": "GenAIWidget",
    "vendor": "Poorna Volety",
    "eula": "",
    "license": "JNJT",
    "icon": "https:\/\/raw.githubusercontent.com\/SAP-Custom-Widget\/ChatGPTWidget\/main\/icon.png",
    "webcomponents": [
        {
            "kind": "main",
            "tag": "com-poornavolety-jnj-GenAIwidget",
            "url": "https://voletypoorna.github.io/SAC/GenAIWidget.js",
            "integrity": "",
            "ignoreIntegrity": true
        },
        {
            "kind": "builder",
            "tag": "com-poornavolety-jnj-GenAIwidget-builder",
            "url": "https://voletypoorna.github.io/SAC/GenAIWidget_Builder.js",
            "integrity": "",
            "ignoreIntegrity": true
        }
    ],
    "properties": {
        "apiKey": {
            "description": "Api Key of GenAI",
            "type": "string",
            "default": ""
        },
        "max_tokens": {
            "description": "Result Max Length",
            "type": "integer",
            "default": 1024
        }
    },
    "methods": {
        "setApiKey": {
            "description": "Set Api Key of GenAI",
            "parameters": [
                {
                    "name": "apiKey",
                    "type": "string",
                    "description": "Api Key of GenAI"
                }
            ],
            "body": "this.apiKey = apiKey;"
        },
        "getApiKey": {
            "returnType": "string",
            "description": "Return Api Key of GenAI",
            "body": "return this.apiKey;"
        },
        "setMax_tokens": {
            "description": "Set Result Max Length",
            "parameters": [
                {
                    "name": "max_tokens",
                    "type": "integer",
                    "description": "Result Max Length"
                }
            ],
            "body": "this.max_tokens = max_tokens;"
        },
        "getMax_tokens": {
            "returnType": "integer",
            "description": "Return Result Max Length",
            "body": "return this.max_tokens;"
        }
    },
    "events": {
        "onClick": {
            "description": "User Clicked."
        }
    }
}


_________________________WIDGET_BUILDER__________________

(function () {
   let template = document.createElement("template");
   template.innerHTML = `
<br>
<style>
    #form {
        font-family: Arial, sans-serif;
        width: 400px;
        margin: 0 auto;
    }

    a {
        text-decoration: none;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 10px;
    }

    td {
        padding: 1px;
        text-align: left;
        font-size: 13px;
    }

    input {
        width: 100%;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        font-size: 13px;
        box-sizing: border-box;
        margin-bottom: 10px;
    }


    input[type="color"] {
	-webkit-appearance: none;
	border: none;
	width: 32px;
	height: 32px;
}
input[type="color"]::-webkit-color-swatch-wrapper {
	padding: 0;
}
input[type="color"]::-webkit-color-swatch {
	border: none;
}


    select {
        width: 100%;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        font-size: 13px;
        box-sizing: border-box;
        margin-bottom: 10px;
    }

    input[type="submit"] {
        background-color: #487cac;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        width: 100%;
    }

    #label {
        width: 140px;
    }
</style>
<form id="form">
    <table>
        <tr>
    <td>
    <p>Api Key of GenAI</p>
    <input id="builder_apiKey" type="text" placeholder="Enter Api Key of GenAI">
    </td>
    </tr>
    <tr>
    <td>
    <p>Result Max Length</p>
    <input id="builder_max_tokens" type="number" placeholder="Enter Result Max Length">
    </td>
    </tr>
    
    </table>
    <input value="Update Settings" type="submit">
    <br>
    <p>Developed by <a target="_blank" href="https://www.linkedin.com/in/poornavolety/">Poorna Volety</a></p>
</form>
`;
   class GenAIWidgetBuilderPanel extends HTMLElement {
      constructor() {
         super();
         this._shadowRoot = this.attachShadow({
            mode: "open"
         });
         this._shadowRoot.appendChild(template.content.cloneNode(true));
         this._shadowRoot
            .getElementById("form")
            .addEventListener("submit", this._submit.bind(this));
      }
      _submit(e) {
         e.preventDefault();
         this.dispatchEvent(
            new CustomEvent("propertiesChanged", {
               detail: {
                  properties: {
                     apiKey: this.apiKey,
                     max_tokens: this.max_tokens
                  },
               },
            })
         );
      }

      set apiKey(_apiKey) {
         this._shadowRoot.getElementById("builder_apiKey").value = _apiKey;
      }
      get apiKey() {
         return this._shadowRoot.getElementById("builder_apiKey").value;
      }

      set max_tokens(_max_tokens) {
         this._shadowRoot.getElementById("builder_max_tokens").value = _max_tokens;
      }
      get max_tokens() {
         return this._shadowRoot.getElementById("builder_max_tokens").value;
      }

   }
   customElements.define("com-poornavolety-jnj-GenAIwidget-builder",
      GenAIWidgetBuilderPanel
   );
})();


*******************WIDGET********************

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
  <h1>GenAI</h1></center>
    <div class="input-container">
      <input type="text" id="prompt-input" placeholder="Enter a prompt">
      <button id="generate-button">Generate Text</button>
    </div>
    <textarea id="generated-text" rows="10" cols="50" readonly></ textarea>
  </div>
    `;
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
        const response = await fetch("https://genaiapimna.jnj.com/openai-completion/openai/deployments/gpt-35-turbo-0301/completions?api-version=2023-03-15-preview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiKey
          },
          body: JSON.stringify({
            "model": "gpt-35-turbo-0301",
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
  customElements.define("com-poornavolety-jnj-GenAIwidget", Widget);
})();
