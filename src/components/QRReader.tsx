import { BrowserQRCodeReader } from "@zxing/browser";
import { Component, onMount } from "solid-js";
import "../index.css";

const QRReader: Component = () => {
  let copyField: HTMLInputElement;

  let copyBtn: HTMLButtonElement;
  var previewElem: HTMLVideoElement;

  onMount(async () => {
    let modal = document.getElementById("my-modal")!;

    modal.style.display = "none";

    // We want the modal to close when the OK button is clicked
    copyBtn.onclick = function () {
      copyToClipboard(copyField);
      modal.style.display = "none";
      window.open(new URL("tel:*99*1*3#"), "_blank");
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
    console.log("started");

    const codeReader = new BrowserQRCodeReader();

    const camera = await navigator?.mediaDevices
      ?.getUserMedia({ video: true })
      .catch(() => console.log());

    if (camera) {
      const videoInputDevices =
        await BrowserQRCodeReader.listVideoInputDevices();

      if (videoInputDevices.length == 0) {
        alert("No cameras detected!");
      } else {
        // choose your media device (webcam, frontal camera, back camera, etc.)
        const selectedDeviceId =
          videoInputDevices.length > 1
            ? videoInputDevices[1].deviceId
            : videoInputDevices[0].deviceId;

        console.log(`Started decode from camera with id ${selectedDeviceId}`);

        // you can use the controls to stop() the scan or switchTorch() if available
        await codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          previewElem!,
          (result, error, controls) => {
            console.log(error, controls);
            try {
              console.log(
                `Scan result: ${result!.getText()}`,
                result!.getText()
              );
              var vpa = new URL(result!.getText()).searchParams.get("pa");
              copyField.value = vpa!;
              modal.style.display = "block";
            } catch (e: any) {}
          }
        );
      }
    }
  });

  function copyToClipboard(el: HTMLInputElement) {
    // resolve the element

    // handle iOS as a special case
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      // save current contentEditable/readOnly status
      var editable = el.contentEditable;
      var readOnly = el.readOnly;

      // convert to editable with readonly to stop iOS keyboard opening
      el.contentEditable = "true";
      el.readOnly = true;

      // create a selectable range
      var range = document.createRange();
      range.selectNodeContents(el);

      // select the range
      var selection = window.getSelection()!;
      selection.removeAllRanges();
      selection.addRange(range);
      el.setSelectionRange(0, 999999);

      // restore contentEditable/readOnly to original state
      el.contentEditable = editable;
      el.readOnly = readOnly;
    } else {
      el.select();
    }

    // execute copy command
    document.execCommand("copy");
  }

  return (
    <div>
      <div class="relative h-full">
        <video class="absolute w-full" ref={previewElem!}></video>
        <div class="absolute w-full h-screen">
          <iframe
            style="border: none"
            width="250"
            height="250"
            class="mx-auto my-32"
            src="https://rive.app/s/mJR1WSYx1EC4jisz7tJE1A/embed"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div
        class="fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="my-modal"
      >
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div class="mt-3 text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                class="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg leading-6 font-medium text-gray-900 mt-5">
              QR scanned successfully!
            </h3>
            <h5 class="text-sm leading-6 font-medium text-gray-400 mt-1">
              Now copy the UPI ID and paste it in upcoming dialog.
            </h5>
            <div class="mt-2 px-7 py-3">
              <input
                class="border border-gray-300 p-2 w-full"
                ref={copyField!}
                id="copy-field"
                placeholder="UPI ID"
                type="text"
              ></input>
            </div>
            <div class="items-center px-4 py-3">
              <button
                id="copy-btn"
                ref={copyBtn!}
                class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRReader;
