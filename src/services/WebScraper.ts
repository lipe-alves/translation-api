import puppeteer, { Browser, Page } from "puppeteer";

class WebScraper {
    private browser: Browser | undefined;
    private page: Page | undefined;

    constructor() {
        this.browser = undefined;
        this.page = undefined;
    }

    public async open(url: string): Promise<this> {
        this.browser = await puppeteer.launch({
            pipe: true,
            args: ["--no-sandbox", "--in-process-gpu"],
        });

        this.page = await this.browser.newPage();
        await this.page.goto(url);
        await this.page.setViewport({
            width: 1080,
            height: 1024,
        });

        return this;
    }

    public async close(): Promise<this> {
        if (this.browser) await this.browser.close();
        return this;
    }

    public async scrape<T>(
        selector: string,
        callback: (htmlElement: Element) => T
    ): Promise<T | undefined> {
        if (!this.page) return undefined;

        const htmlElement = await this.page.waitForSelector(selector);
        if (!htmlElement) return undefined;

        return htmlElement.evaluate(callback);
    }
}

export default WebScraper;
export { WebScraper };
