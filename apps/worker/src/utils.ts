export const parse = (
    text: string,
    value: any,
    startDelimeter = "{",
    endDelimeter = "}"
): string => {
    let result = "";
    let startIndex = 0;

    while (startIndex < text.length) {
        let openIndex = text.indexOf(startDelimeter, startIndex);
        if (openIndex === -1) {
            result += text.slice(startIndex);
            break;
        }

        result += text.slice(startIndex, openIndex);
        let closeIndex = text.indexOf(endDelimeter, openIndex + 1);
        if (closeIndex === -1) {
            result += text.slice(openIndex);
            break;
        }

        let keys = text
            .slice(openIndex + 1, closeIndex)
            .trim()
            .split(".");
        let localVal: any = value;

        for (let key of keys) {
            if (typeof localVal === "string") {
                try {
                    localVal = JSON.parse(localVal);
                } catch {
                    break;
                }
            }
            if (localVal && typeof localVal === "object" && key in localVal) {
                localVal = localVal[key];
            } else {
                localVal = `{${keys.join(".")}}`;
                break;
            }
        }

        result += localVal;
        startIndex = closeIndex + 1;
    }

    return result;
};
