
export function getBrowserInfo(userAgent: string): { name?: string; version?: string; os?: string; } {
    const browserInfo = {
        name: getBrowserName(userAgent),
        version: getBrowserVersion(userAgent),
        os: getOS(userAgent),
    };
    return browserInfo;
}

function getBrowserName(userAgent: string): string | undefined {
    if (userAgent.includes("Chrome")) {
        return "Chrome";
    } else if (userAgent.includes("Firefox")) {
        return "Firefox";
    } else if (userAgent.includes("Safari")) {
        return "Safari";
    } else if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) {
        return "Internet Explorer";
    } else {
        return undefined;
    }
}

function getBrowserVersion(userAgent: string): string | undefined {
    let match;
    if (userAgent.includes("Chrome")) {
        match = userAgent.match(/Chrome\/([0-9.]+)/);
    } else if (userAgent.includes("Firefox")) {
        match = userAgent.match(/Firefox\/([0-9.]+)/);
    } else if (userAgent.includes("Safari")) {
        match = userAgent.match(/Version\/([0-9.]+)/);
    } else if (userAgent.includes("MSIE")) {
        match = userAgent.match(/MSIE ([0-9.]+)/);
    } else if (userAgent.includes("Trident/")) {
        match = userAgent.match(/rv:([0-9.]+)/);
    }
    return match ? match[1] : undefined;
}

function getOS(userAgent: string): string | undefined {
    if (userAgent.includes("Win")) {
        return "Windows";
    } else if (userAgent.includes("Mac")) {
        return "MacOS";
    } else if (userAgent.includes("Linux")) {
        return "Linux";
    } else if (userAgent.includes("Android")) {
        return "Android";
    } else if (userAgent.includes("like Mac")) {
        return "iOS";
    } else {
        return undefined;
    }
}
