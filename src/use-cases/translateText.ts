import { WebScraper } from "../services";

interface TextTranslationOptions {
    from?: string | "auto";
    to: string;
}

interface TextTranslationResponse {
    from: string;
    to: string;
    translation: string;
}

async function translateText(
    text: string,
    options: TextTranslationOptions
): Promise<TextTranslationResponse> {
    const { from = "auto", to } = options;

    const webScraper = new WebScraper();

    await webScraper.open(
        `https://translate.google.com.br/?sl=${from}&tl=${to}&text=${encodeURIComponent(
            text
        )}&op=translate`
    );

    const translatedText = await webScraper.scrape<string>(
        '[jsname="W297wb"]',
        (translationContainer) => {
            //if (!isHTMLElement(translationContainer)) return "";
            if (!translationContainer) return "";
            // @ts-ignore
            return translationContainer.innerText;
        }
    );

    await webScraper.close();

    return {
        from,
        to,
        translation: translatedText || "",
    };
}

export default translateText;
export { translateText };
export type { TextTranslationOptions, TextTranslationResponse };
