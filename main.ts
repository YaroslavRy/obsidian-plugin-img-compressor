// https://docs.obsidian.md/Plugins/User+interface/Commands

import Compressor from "compressor";
import { App, Menu, Modal, Notice, Plugin, Setting } from "obsidian";

export default class ExamplePlugin extends Plugin implements Compressor {
    shout() {

    }


    async onload() {
        console.log('Im alive. What are your intensions today?');

        this.addCommand({
            // TODO: rename to 'search-images'
            id: "search-files",
            name: "Search all the files inside this Vault",
            callback: () => {
                this.searchFiles();
            },
        });

        this.addRibbonIcon("dice", "Open menu", (event) => {
            const menu = new Menu();

            menu.addItem((item) =>
                item
                    .setTitle("Copy")
                    .setIcon("documents")
                    .onClick(() => {
                        new Notice("Copied");
                    })
            );

            menu.addItem((item) =>
                item
                    .setTitle("Paste")
                    .setIcon("paste")
                    .onClick(() => {
                        new Notice("Pasted");
                    })
            );

            menu.showAtMouseEvent(event);
        });

        this.registerEvent(
            this.app.workspace.on("file-menu", (menu, file) => {
                menu.addItem((item) => {
                    item
                        .setTitle("Print file path 👈")
                        .setIcon("document")
                        .onClick(async () => {
                            new Notice(file.path);
                            console.log(file.path);
                        });
                });
            }))

        this.addCommand({
            id: "display-modal",
            name: "Display modal",
            callback: () => {
                new ExampleModal(this.app, (result) => {
                    new Notice(`Hello, ${result}!`);
                }).open();
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
        console.log('onLayoutReady');
    }

    async onunload() {
        console.log('good bye');
    }
}

export class ExampleModal extends Modal {
    result: string;
    onSubmit: (result: string) => void;

    constructor(app: App, onSubmit: (result: string) => void) {
        super(app);
        this.onSubmit = onSubmit;
    }


    onOpen() {
        const { contentEl } = this;

        contentEl.createEl("h1", { text: "What's your name?" });

        new Setting(contentEl)
            .setName("Name")
            .addText((text) =>
                text.onChange((value) => {
                    this.result = value
                }));

        new Setting(contentEl)
            .addButton((btn) =>
                btn
                    .setButtonText("Submit")
                    .setCta()
                    .onClick(() => {
                        this.close();
                        this.onSubmit(this.result);
                    }));
    }

    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}