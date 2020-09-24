Object.defineProperty(window, "Enviroment", {
    get: () => {
        var host = window.location.host
        if (host.includes("localhost")) { return "LOCAL"; }
        if (host.includes('evolucaodesenv')) { return "DEVELOPMENT"; }
        if (host.includes('evolucaoteste')) { return "TEST"; }
        if (host.includes('sdocs-hml')) { return "HOMOLOG"; }
        if (host == 'sdocs.safeweb.com.br') { return "PRODUCTION"; }
        return null;
    }
});