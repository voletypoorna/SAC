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
  <img src="https://www.bing.com/images/search?view=detailV2&ccid=91e%2b7lDw&id=9E10560473ADA2FFB00D6625EDFDE5FF34AA9A1E&thid=OIP.91e-7lDwJg78prnDUx4PgQHaHa&mediaurl=https%3a%2f%2f21050941.fs1.hubspotusercontent-na1.net%2fhubfs%2f21050941%2f0.Images%2fServiceIcons%2fPNG-HighRes%2fLogo_GenAI.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.f757beee50f0260efca6b9c3531e0f81%3frik%3dHpqqNP%252fl%252fe0lZg%26pid%3dImgRaw%26r%3d0&exph=4267&expw=4267&q=GenAI+Logo&simid=608037434226251981&FORM=IRPRST&ck=36EDCEFBDF046D0B74214EFB825EB034&selectedIndex=0&itb=1&idpp=overlayview&ajaxhist=0&ajaxserp=0"/>
  
  <h1>(A.I)</h1></center>
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
        const response = await fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiKey
          },
          body: JSON.stringify({
            "model": "gpt-3.5-turbo-instruct",
            "prompt": prompt,
            "max_tokens": parseInt(max_tokens),
            "n": 1,
            "temperature": 0.5
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
          alert("OpenAI Response: " + error.error.message);
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
  customElements.define("com-poornavolety-jnj-chatgptwidget", Widget);
})();
