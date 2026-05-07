if (process.env.NODE_ENV === "development") {
    const modules = import.meta.glob('./*.js', {eager: true});
    Object.values(modules).forEach((modulo) => {
        console.log(modulo);
        window.TOOLS = modulo.default
    });

}