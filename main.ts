import { Plugin } from "obsidian";

export default class ExamplePlugin extends Plugin {
    async onload() {
        console.log('Im alive. What are your intensions today?');

        this.addCommand({
            // TODO: rename to 'search-images'
            id: "search-files",
            name: "Search all the files inside a Vault",
            callback: () => {
                this.searchFiles();
            },
        });
    }

    searchFiles() {
        const files = this.app.vault.getFiles();

        console.log('Files:');
        console.log(files);

        for (let i = 0; i < files.length; i++) {
            console.log(files[i].path);
        }

    }

    onLayoutReady() {

    }

    async onunload() {
        console.log('good bye');
    }
}
