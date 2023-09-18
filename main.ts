// https://docs.obsidian.md/Plugins/User+interface/Commands

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

        // var extensions = ['.png', '.PNG', '.JPG', '.jpg', '.jpeg'];
        var extension = '.png';

        console.log('Files:');
        console.log(files);

        for (let i = 0; i < files.length; i++) {
            let filepath = files[i].path;
            if (filepath.indexOf(extension) !== -1) {
                console.log('image:');
                console.log(filepath);
            }
        }
    }

    onLayoutReady() {

    }

    async onunload() {
        console.log('good bye');
    }
}
