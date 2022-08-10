// UI Components
const video = document.querySelector(".video");
const button = document.querySelector(".button");

class App {
	constructor() {
		this.isPipAvailable();
		this.getMedia();

		// Activate Picture in Picture onclick
		button.addEventListener("click", this.picInPic);
	}

	// Picture in Picture Validation
	isPipAvailable() {
		if (!"pictureInPictureEnabled" in document) button.disabled = true;
	}

	// Video processing
	async getMedia() {
		try {
			const captureStream = await navigator.mediaDevices.getDisplayMedia();
			video.srcObject = captureStream;
			video.onloadedmetadata = () => {
				video.play();
			};
		} catch (err) {
			console.log(`Error 💥 -> ${err}`);
		}
	}

	// Picture in Picture activation
	async picInPic() {
		try {
			button.disabled = true;
			await video.requestPictureInPicture();
			button.disabled = false;
		} catch (err) {
			console.log(`Error 💥 -> ${err}`);
		}
	}
}

const app = new App();
