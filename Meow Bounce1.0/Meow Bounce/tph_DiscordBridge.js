// Ensure the Discord Embedded App SDK script is loaded in your HTML5 index template
function js_init_discord_sdk(clientId) {
    if (typeof discordSdk !== 'undefined') {
        const discordSdk = new DiscordSDK({ client_id: clientId });
        
        setupDiscord();
        return "SDK Loaded Successfully";
    }
    return "SDK Not Found";
}

async function setupDiscord() {
    // Wait for the SDK to authorize and connect to the client
    await discordSdk.ready();
    console.log("Discord SDK is ready!");
    
    // Example: Authenticate and authorize user permissions
    const auth = await discordSdk.commands.authorize({
        client_id: clientId,
        response_type: 'code',
        state: '',
        prompt: 'none',
        scope: ['identify', 'guilds'],
    });
}

function js_check_discord_handshake() {
    if (typeof window.DiscordSDK === 'undefined') {
        console.error("Discord SDK script missing from index.html head!");
        return "ERROR_MISSING_SDK"; 
    }
    
    const isInsideDiscord = window.location.ancestorOrigins && 
                            window.location.ancestorOrigins.contains('https://discord.com');

    if (!isInsideDiscord) {
        console.warn("SDK is present, but running outside Discord.");
        return "BROWSER_MODE"; 
    }

    return "CONNECTED"; 
}

